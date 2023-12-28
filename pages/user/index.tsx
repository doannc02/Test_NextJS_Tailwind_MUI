import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridToolbarContainer,
} from '@mui/x-data-grid';
import {
  randomId
} from '@mui/x-data-grid-generator';
import { useMutation, useQuery } from '@tanstack/react-query';
import * as React from 'react';
import { getUsers, updateUser } from '../api/user.api';
import { get } from 'http';
// import { IUserFilter } from '../types/user.type';

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
        ...oldRows,
        {
          id,
          email: '', // Bổ sung email ở đây
          fullName: '', // Bổ sung fullName ở đây
          isNew: true,
        },
      ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'FullName' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add User
      </Button>
    </GridToolbarContainer>
  );
}

export default function User() {
  const [rows, setRows] = React.useState<GridRowsProp >([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const [pageCurrent, setPageCurrent] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const getAll = async (_page: number) => {
    setIsLoading(true);
    const res = await getUsers(_page, pageSize).finally(() => setIsLoading(false));
    console.log(res, 'day nay')
    setRows(res.data.Data);
    return res;
  };
  const update = async (id: string, name: string) => {
    return await updateUser(id, name);
  };

  //dung useEffect call api
  const [isLoading, setIsLoading] = React.useState<Boolean>(false);
  // React.useEffect(() => {
  //   setIsLoading(true);
  //   const timeOut = setTimeout(() => {
  //     getAll(pageCurrent);
  //     setIsLoading(false);
  //   }, 3000);
  //   return () => clearTimeout(timeOut);
  // }, []);


  // tanstack query
  type paramsUser = { _page: number; _pageSize: number };
  const requestUser: paramsUser = {
    _page: pageCurrent,
    _pageSize: pageSize,
  };
  // get
 const getUseQuery = useQuery(
   ["user", pageCurrent],  () => getAll(pageCurrent),  
   {staleTime: 0,
    onSuccess: (_) => {
      console.log(getUseQuery.data, "success");
    },
    onError: (error: any) => {
      console.log(error);
    },
    cacheTime: Infinity,
   }
  );

  // update
  const updateMutation = useMutation(
    ({ id, name }: { id: string; name: string }) => update(id, name),
    {
      onSuccess: () => {
        getUseQuery.refetch();
        alert("Cập nhật dữ liệu thành công!");
      },
      onError: (error: any) => {
        console.log(error);
      },
      
    },

  );

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.Id === newRow.Id ? updatedRow : row)));
    console.log(newRow.Email, newRow.FullName);
    let id = newRow.Email.toString();
    let name = newRow.FullName.toString();
    updateMutation.mutate({ id, name });
    return updatedRow;
  };

  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 25,
    page: 0,
  });
  const columns: GridColDef[] = [
    { field: "FullName", headerName: "Name", width: 180, editable: true },
    {
      field: "Role",
      headerName: "Role",
      type: "string",
      width: 140,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "Email",
      headerName: "Email",
      type: "string",
      width: 180,
      editable: true,
    },
    {
      field: "DepartmentName",
      headerName: "Department",
      width: 180,
      editable: true,
      type: "singleSelect",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 130,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <>
      {getUseQuery.isSuccess && (
       // !isLoading && (
       <Box
          sx={{
            height: 500,
            width: "100%",
            "& .actions": {
              color: "text.secondary",
            },
            "& .textPrimary": {
              color: "text.primary",
            },
          }}
        >
          <DataGrid
            paginationMode='server'
           rows={getUseQuery.data.data.Data ?? []}
            //rows={rows}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            processRowUpdate={processRowUpdate}
            //loading={!!isLoading}
            loading={getUseQuery.isLoading}
            slots={{
              toolbar: EditToolbar,
            }}
            slotProps={{
              toolbar: { setRows, setRowModesModel },
            }}
            pageSizeOptions={[10,25,50,100]}
           paginationModel={{pageSize: pageSize, page: pageCurrent}}
           // rowCount={getUseQuery.data.data.totalRecords}
           rowCount={113}
            onPaginationModelChange={async(props) => { setPageCurrent(props.page); setPageSize(props.pageSize);
             
              // const res = await getAll(pageCurrent); setRows(res.data.Data);
              //                       console.log(props.page, pageCurrent) 
            }}
            pagination 
            getRowId={(row) => row.Id}
          />
        </Box>
      )}

    </>
  );
}