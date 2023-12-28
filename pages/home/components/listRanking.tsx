import { ColumnProps, CustomTable } from "@/components/TableCustom";
import React from "react";

const data = [
  { No: 1, Name: "Đào Hồng Hải", Role: "JQC", Team: "RV1", Star: 34 },
  { No: 2, Name: "Dương Trung Đạt", Role: "JQC", Team: "RV1", Star: 33 },
  { No: 3, Name: "Đỗ Thị Huyền", Role: "JQC", Team: "RV1", Star: 33 },
  { No: 4, Name: "Bùi Thị Thuỷ", Role: "JQC", Team: "RV1", Star: 32 },
  { No: 5, Name: "Cấn Thị Mai Hương", Role: "JQC", Team: "RV1", Star: 32 },
  { No: 6, Name: "Vũ Thị Minh Thuý", Role: "JQC", Team: "Shōgaisha", Star: 31 },
  { No: 7, Name: "Bùi Thị Mai Anh", Role: "JQC", Team: "RV1", Star: 30 },
  { No: 8, Name: "Đỗ Văn Tú", Role: "JQC", Team: "RV1", Star: 28 },
  { No: 9, Name: "Trần Đức Trung", Role: "JQC", Team: "RV1", Star: 28 },
  { No: 10, Name: "Trần Thị Trâm", Role: "JQC", Team: "RV1", Star: 27 },
];

const RankingLayout = () => {

  
  const columns = React.useMemo(
    () =>
      [
        {
          header: "Tên",
          fieldName: 'Name',
        },
        {
          header: 'Vị trí',
          fieldName: 'Role',
        },
        {
          header:'Dự án',
          fieldName: 'Team',
          styleCell: {
            width: '250px',
          },
        },
        {
            header: 'Số sao',
            fieldName: 'Star',
          },
      ] as ColumnProps[],
    []
  )
  return (
      <CustomTable className='w-full' maxHeight={70} isShowColumnStt={true} data={data} columns={columns}/>
  );
};

export default RankingLayout;
