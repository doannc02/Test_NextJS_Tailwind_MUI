import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LinearProgressWithLabel from './progressbar';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
 const Objectives = [
    {
        "Name": "Đạt doanh thu 668MM trong năm 2023",
        "Percent": 50
    },
    {
        "Name": "Nâng cao chất lượng và hiệu suất theo như target của khách hàng",
        "Percent": 50
    },
    {
        "Name": "Nâng cao nghiệp vụ y tế/Testing toàn dự án",
        "Percent": 23
    },
    {
        "Name": "Tiếp tục duy trì và phát triển văn hóa dự án theobộ GTCL công ty",
        "Percent": 93
    }
]
const  Objectives1 = [
    {
        "Name": "Đảm bảo tiến độ và chất lượng cho tất cả các dự án",
        "Percent": 94
    },
    {
        "Name": "Triển khai y tế số",
        "Percent": 35
    },
    {
        "Name": "Phát triển đội ngũ",
        "Percent": 65
    }
]
export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Team BU4" {...a11yProps(0)} />
          <Tab label="Team UWA" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {
            Objectives.map((item,i) => (
                <div key={i} className='my-12'>
                    <p>{item.Name}</p>
                    <LinearProgressWithLabel  value={item.Percent}/>
                </div>
            ))
        }
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      {
            Objectives1.map((item,i) => (
                <div key={i} className='my-12'>
                    <p>{item.Name}</p>
                    <LinearProgressWithLabel value={item.Percent}/>
                </div>
            ))
        }
      </CustomTabPanel>
    </Box>
  );
}


