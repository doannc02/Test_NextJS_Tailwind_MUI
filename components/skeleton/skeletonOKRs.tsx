import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const SkeletonOkrs = ({isDisplayListKr}: {isDisplayListKr?: boolean}) => {
  const numSkeletons = 10; // Số lượng dòng skeleton

  return  (
        <Box>
  {[...Array(numSkeletons)].map((_, index) => (
   <div key={index}>
   <Skeleton animation="wave" height="160px" className="m-5"/>
    <>
    {isDisplayListKr ? <>
      <Skeleton  animation="wave" height="40px" className="m-1"/>
   <Skeleton  animation="wave" height="40px" className="m-1"/>
    </> : <></>}
    </>
   </div>
    
  ))}
</Box>
  )
   
}
export default SkeletonOkrs