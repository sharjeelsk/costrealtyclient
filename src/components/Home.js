import React from 'react'
import "./Home.scss"
import readXlsxFile from 'read-excel-file'
import * as XLSX from 'xlsx/xlsx.mjs';
import axios from 'axios';
import {TextField,Button} from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete';
import _ from 'lodash'
import leftimg from './leftimg.jpeg'
import rightimg from './rightimg.jpeg'
const options = ['Ground Floor', '1st Floor','2nd Floor','5th Floor','6th Floor','7th Floor','8th Floor','9th Floor','10th Floor','11th Floor','12th Floor','13th Floor','14th Floor','15th Floor', '16th Floor'];
function Home(props) {
    const [data,setData]=React.useState([])
    const [value, setValue] = React.useState(options[0]);
    const [officeData,setOfficeData]=React.useState([])
    const [selectedOffice,setSelectedOffice]=React.useState([])
    const [rate,setRate]=React.useState(0)

    const getExcelData = (index)=>{
        axios.post(`${process.env.REACT_APP_PRODUCTION}/`,{sheet:index})
        .then(res=>{
            console.log(res)
            let keys = res.data[2]
            let arr = res.data.map((item)=>{
                return item.map((val,index)=>{
                  //console.log(keys[index])
                  let key = keys[index]
                  return {[key]:val};
                })
            })
            setData(arr)
            let offices = []
            arr.map(item=>{
                item.map(obj=>{
                    _.map(obj,(value,key)=>{
                        if(key==="UNIT" && value!=="UNIT" && value!==null){
                            offices.push(value)
                        }
                    })
                })
            })
            setOfficeData(offices)
        })
    }

    React.useEffect(()=>{
        getExcelData(2)

    },[])


    const handleSubmit = ()=>{
        //console.log(data,selectedOffice,rate)
        let arr = []
        data.map(item=>{
            item.map(obj=>{
                if(selectedOffice.includes(obj['UNIT'])){
                    arr.push(item)
                }
            })
        })
        console.log(arr)
        props.history.push("/costsheet",{sheets:arr,selectedOffice,rate,value})
    }

    return (
        <div>
            <div className="row align-items-center m-auto justify-content-between">
            <div>
                <img src={leftimg} alt="leftimg" />
            </div>
            <div className="col-4">
            <h1 style={{borderRadius:"10px"}}>Cost Sheet</h1>
            </div>
            <div>
                <img src={rightimg} alt="rightimg" />
            </div>
            </div>

            <form>
            <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          getExcelData(options.indexOf(newValue)+1)
          setValue(newValue);
        }}
        // getOptionDisabled={(option) =>
        //     option === options[0] || option === options[1] || option === options[2] || option === options[3]
        //   }
        fullWidth
        id="controllable-states-demo"
        options={options}
        renderInput={(params) => <TextField className="my-3" {...params} label="Select Floor" />}
      />
                 <Autocomplete
        multiple
        id="tags-standard"
        options={officeData}
        getOptionLabel={(option) => option}
        onChange={(e,val)=>{
            setSelectedOffice(val)
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Unit No"
            placeholder="Unit No"
          />
        )}
      />
            <TextField onChange={(e)=>setRate(e.target.value)} className='my-3' fullWidth variant="outlined" id="outliend-basics" label="Rate Per Sq.ft Amount" />
            <Button onClick={()=>handleSubmit()} variant="contained">Generate CostSheet</Button>
            </form>
        </div>
    )
}

export default Home
        // const input = document.getElementById('input')
        // console.log(input);
        // input.addEventListener('change', () => {
        //     const map = {
                
        //             "SHOP":"SHOP",
        //             "Total Area(SQM)":"Total Area(SQM)",
        //             "Shop Area(SQM)":"Shop Area(SQM)",
        //             "SHOP AREA(SFT)":"SHOP AREA(SFT)",
        //             "Sitout Area(Sq.Mt.) @ 50% Loading":"Sitout Area(Sq.Mt.) @ 50% Loading",
        //             "Sitout Area(Sq.Ft.) @ 50% Loading":"Sitout Area(Sq.Ft.) @ 50% Loading",
        //             "TOTAL(SFT)":"TOTAL(SFT)",
        //             "SALEABLE":"SALEABLE",
        //             "Basic Value":"Basic Value",
        //             "Covered Car Parking Charges":"Covered Car Parking Charges",
        //             "Bike Parking":"Bike Parking",
        //             "Agreement Value":"Agreement Value",
        //             "null":null,
        //             "Agreement Value After APD":"Agreement Value After APD",
        //             "Gen Set":"Gen Set",
        //             "MSEB":"MSEB",
        //             "Share Money":"Share Money",
        //             "nuls":null,
        //             "Agreement Value + Other Charges":"Agreement Value + Other Charges",
        //             "Registration Charges":"Registration Charges",
        //             "GST on Agreement Value":"GST on Agreement Value",
        //             "GST on other Charges":"GST on other Charges",
        //             "Stamp Duty":"Stamp Duty",
        //             "Legal":"Legal",
        //             "Total Value":"Total Value",
        //             "nulla":null,
        //             "Client Name":"Client Name",
        //             "Client Location":"Client Location",
        //             "Source":"Source",
        //             "Rate/sq ft":"Rate/sq ft",
        //             "4 Wheeler Parking Number":"4 Wheeler Parking Number",
        //             "2 Wheeler Parking Number":"2 Wheeler Parking Number",
        //             "Parking Type for 4 Wheeler":"Parking Type for 4 Wheeler",
        //             "Parking Type for 2 Wheeler":"Parking Type for 2 Wheeler",
        //             "Place":"Place"
                
        //     }
        //   readXlsxFile(input.files[0],{sheet:1}).then((rows) => {
        //     let keys = rows[2]
        //     let arr = rows.map((item)=>{
        //         return item.map((val,index)=>{
        //           //console.log(keys[index])
        //           let key = keys[index]
        //           return {[key]:val};
        //         })
        //     })
        //     setData(arr)

        //   })

        // })
