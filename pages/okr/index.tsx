import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { IUser } from "../types/user.type";
import { useRouter } from "next/router";
import PersistentDrawerLeft from "@/components/main/main";
import { InputLabel, Paper, styled } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Modal from "@/components/modal/modalOkr";
import TextFiled from "@mui/material/TextField";
import { MainOKR } from "./components/main";

// chart rank
export default function Okr() {
  // method call api
  const handleGetData = async () => {};
  //get data okr
  const getDataOkr = useQuery(["dataOKR"], () => handleGetData());
  //Item
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const [showModal, setShowModal] = React.useState(false);
  const [domLoaded, setDomLoaded] = React.useState(false);
  const [data, setData] = React.useState<IUser>();
  const router = useRouter();
  const isAuthenticated =
  

  React.useEffect(() => {
    setDomLoaded(true)
  }, []);

  if (domLoaded) {
    return (
      <>
        <PersistentDrawerLeft title={"OKR"} children={<MainOKR />} />
        {showModal && (
          <Modal title="Tạo mới OKR" onClose={() => setShowModal(false)}>
            <Stack paddingTop={2}>
              <InputLabel>Tên Okr</InputLabel>
              <TextFiled helperText="Nhập tên OKR"></TextFiled>
              <Stack
                paddingTop={10}
                justifyContent={"space-between"}
                direction={"row"}
              >
                <Stack>
                  <InputLabel>Ngày băt đầu</InputLabel>
                  <div className="p-5 border-2">
                    <input type="datetime-local" placeholder="Ngày bắt đầu" />
                  </div>
                </Stack>
                <Stack>
                  <InputLabel>Ngày băt đầu</InputLabel>
                  <div className="p-5 border-2">
                    <input type="datetime-local" placeholder="Ngày kết thúc" />
                  </div>
                </Stack>
              </Stack>
            </Stack>
            <Stack
              width={"20%"}
              paddingTop={3}
              direction={"row"}
              justifyContent={"space-between"}
            >
              <Button sx={{ border: "1px solid" }}>Add</Button>
              <Button
                color="warning"
                sx={{ border: "1px solid" }}
                onClick={() => setShowModal(false)}
              >
                Hủy
              </Button>
            </Stack>
          </Modal>
        )}
      </>
    );
  }
}
