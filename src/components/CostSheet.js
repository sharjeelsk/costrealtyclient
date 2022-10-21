import React from 'react'
import "./CostSheet.scss"
import _ from 'lodash'
import date from 'date-and-time'
import {Button} from '@mui/material'
import JsPDF from 'jspdf';
function CostSheet(props) {
    let sheetArray = props.location.state.sheets;
    let selectedOffices = props.location.state.selectedOffice;
    let rate  = parseInt(props.location.state.rate)
    console.log(props,rate)

    const [sheet,setSheet]=React.useState({
        carpetAreaSM:0,carpetAreaSF:0,enclosedBalconySM:0,enclosedBalconySF:0,
        terraceSM:0,terraceSF:0,totalCarpetAreaSM:0,totalCarpetAreaSF:0,
        basicValue:0,carParkingCharges:0,bikeParkingCharges:0,agreementCost:0,
        dgBackupCharges:0,msebCharges:0,shareMoneyCharges:0,otherCharges:0,totalCostExcludingGovtTaxes:0,
        centralGST:0,stateGST:0,totalGST:0,
        stampDuty:0,registrationCharges:0,legalCharges:0,
        totalStampDutyRegistrationCharges:0,totalCostIncludingGovtTaxes:0,
        am1:0,am2:0,am3:0,am4:0,am5:0,am6:0,am7:0,am8:0,am9:0,am10:0,am11:0,
        amg1:0,amg2:0,amg3:0,amg4:0,amg5:0,amg6:0,amg7:0,amg8:0,amg9:0,amg10:0,amg11:0,
        amTotal:0,amgTotal:0,
        maintainanceCharges:0

    })
    const generatePDF = () => {

        const report = new JsPDF({
            orientation: "landscape",
            unit: "in",
            format: [4, 2]
          });
        report.html(document.querySelector('#report')).then(() => {
            report.save('report.pdf');
        });
    }
    React.useEffect(()=>{
        let carpetAreaSM=0; let enclosedBalconySM=0; let terraceSM=0;
        let carpetAreaSF=0; let enclosedBalconySF=0; let terraceSF=0; let saleable=0;
        let basicValue = 0; let carParkingCharges=0; let bikeParkingCharges=0; let agreementCost=0
        let dgBackupCharges=0; let msebCharges=0; let shareMoneyCharges=0; let otherCharges=0; let totalCostExcludingGovtTaxes=0;
        let centralGST=0; let stateGST=0; let totalGST=0;
        let stampDuty=0; let registrationCharges=0;let legalCharges=0;
        let totalStampDutyRegistrationCharges=0;let totalCostIncludingGovtTaxes=0
        let maintainanceCharges=0;
        //mapping on array of arrays of object
        sheetArray.map(item=>{
            //mapping on array of object
            item.map(obj=>{
                //object key value mapping
                _.map(obj,(value,key)=>{
                    if(key==="Shop Area (SQM)"){
                        carpetAreaSM=carpetAreaSM+value
                    }if(key==="SHOP AREA (SFT)"){
                        carpetAreaSF=carpetAreaSF+value
                    }if(key==="Balcony Area (Sq.Mt.)" || key==="Sitout Area (Sq.Mt.)"){
                        enclosedBalconySM=enclosedBalconySM+value
                    }if(key==="Balcony Area (Sq.Ft.)" || key==="SitoutArea (Sq.Ft.)"){
                        enclosedBalconySF=enclosedBalconySF+value
                    } //loft here
                    if(key==="Shop Area (SQM)"){
                        //terraceSM=terraceSM+value
                        terraceSM=0
                    }if(key==="SHOP AREA (SFT)"){
                        //terraceSF=terraceSF+value
                        terraceSF=0
                    }if(key==="SALEABLE" || key==="SALEABLE (sq ft)"){
                        saleable=saleable+value
                    }if(key==="Covered Car Parking Charges"){
                        carParkingCharges=carParkingCharges+value
                    }if(key==="Bike Parking"){
                        bikeParkingCharges=bikeParkingCharges+value
                    }if(key==="Gen Set"){
                        dgBackupCharges=dgBackupCharges+value
                    }if(key==="MSEB"){
                        msebCharges=msebCharges+value
                    }if(key==="Share Money"){
                        shareMoneyCharges=shareMoneyCharges+value
                    }if(key==="Legal"){
                        legalCharges=legalCharges+value
                    }
                })
            })
        })
        let totalCarpetAreaSM=carpetAreaSM+enclosedBalconySM+terraceSM;
        let totalCarpetAreaSF=carpetAreaSF+enclosedBalconySF+terraceSF;
        bikeParkingCharges=bikeParkingCharges*parseInt(props.location.state.bike);
        carParkingCharges=1000000*parseInt(props.location.state.car);
        basicValue=saleable*rate
        agreementCost = basicValue+carParkingCharges+bikeParkingCharges;
        otherCharges=dgBackupCharges+msebCharges+shareMoneyCharges;
        totalCostExcludingGovtTaxes=agreementCost+otherCharges
        centralGST=((agreementCost+dgBackupCharges+msebCharges)*6)/100
        stateGST=((agreementCost+dgBackupCharges+msebCharges)*6)/100;
        totalGST=centralGST+stateGST
        stampDuty=(agreementCost*7)/100;
        registrationCharges=30000*props.location.state.selectedOffice.length;
        totalStampDutyRegistrationCharges=stampDuty+registrationCharges+legalCharges;
        totalCostIncludingGovtTaxes=totalCostExcludingGovtTaxes+totalGST+totalStampDutyRegistrationCharges
        maintainanceCharges = saleable * 7 * 24
        setSheet({
            carpetAreaSM:Math.round(carpetAreaSM * 100) / 100,
            carpetAreaSF:Math.round(carpetAreaSF * 100) / 100,
            enclosedBalconySM:Math.round(enclosedBalconySM * 100) / 100,
            enclosedBalconySF:Math.round(enclosedBalconySF * 100) / 100,
            terraceSM:Math.round(terraceSM * 100) / 100,
            terraceSF:Math.round(terraceSF * 100) / 100,
            totalCarpetAreaSM:Math.round(totalCarpetAreaSM * 100) / 100,
            totalCarpetAreaSF:Math.round(totalCarpetAreaSF * 100) / 100,


            basicValue:Math.round(basicValue * 100) / 100,
            carParkingCharges:Math.round(carParkingCharges * 100) / 100,
            bikeParkingCharges:Math.round(bikeParkingCharges * 100) / 100,
            agreementCost:Math.round(agreementCost * 100) / 100,


            dgBackupCharges:Math.round(dgBackupCharges * 100) / 100,
            msebCharges:Math.round(msebCharges * 100) / 100,
            shareMoneyCharges:Math.round(shareMoneyCharges * 100) / 100,
            otherCharges:Math.round(otherCharges * 100) / 100,
            totalCostExcludingGovtTaxes:Math.round(totalCostExcludingGovtTaxes * 100) / 100,

            centralGST:Math.round(centralGST * 100) / 100,
            stateGST:Math.round(stateGST * 100) / 100,
            totalGST:Math.round(totalGST * 100) / 100,

            stampDuty:Math.round(stampDuty * 100) / 100,
            registrationCharges:Math.round(registrationCharges * 100) / 100,
            legalCharges:Math.round(legalCharges * 100) / 100,
            totalStampDutyRegistrationCharges:Math.round(totalStampDutyRegistrationCharges * 100) / 100,
            totalCostIncludingGovtTaxes:Math.round(totalCostIncludingGovtTaxes * 100) / 100,

            am1:Math.round(((agreementCost*9)/100) * 100) / 100,
            am2:Math.round(((agreementCost*21)/100) * 100) / 100,
            am3:Math.round(((agreementCost*15)/100) * 100) / 100,
            am4:Math.round(((agreementCost*20)/100) * 100) / 100,
            am5:Math.round(((agreementCost*10)/100) * 100) / 100,
            am6:Math.round(((agreementCost*5)/100) * 100) / 100,
            am7:Math.round(((agreementCost*5)/100) * 100) / 100,
            am8:Math.round(((agreementCost*5)/100) * 100) / 100,
            am9:Math.round(((agreementCost*5)/100) * 100) / 100,
            am10:Math.round(((agreementCost*5)/100) * 100) / 100,
            am11:Math.round(otherCharges * 100) / 100,

            amg1:Math.round((((agreementCost*9)/100)*12/100) * 100) / 100,
            amg2:Math.round((((agreementCost*21)/100)*12/100) * 100) / 100,
            amg3:Math.round((((agreementCost*15)/100)*12/100) * 100) / 100,
            amg4:Math.round((((agreementCost*20)/100)*12/100) * 100) / 100,
            amg5:Math.round((((agreementCost*10)/100)*12/100) * 100) / 100,
            amg6:Math.round((((agreementCost*5)/100)*12/100) * 100) / 100,
            amg7:Math.round((((agreementCost*5)/100)*12/100) * 100) / 100,
            amg8:Math.round((((agreementCost*5)/100)*12/100) * 100) / 100,
            amg9:Math.round((((agreementCost*5)/100)*12/100) * 100) / 100,
            amg10:Math.round((((agreementCost*5)/100)*12/100) * 100) / 100,
            amg11:Math.round((otherCharges * 100)*12/100) / 100,

            maintainanceCharges:Math.round(maintainanceCharges * 100) / 100,
        })
    },[])
    //console.log(sheet)
    function formatToCurrency(amount){
        return "₹" + (amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
    }
    

  return (
<div>

    <div className='cost-sheet' id="report">
        <h1>Cost Sheet & Payment Schedule For Office Platinum Capital</h1>

<div className='p-0 row row-cell m-auto'>
    <div className="p-2 col-cell col-10">
        <p>Date of Booking</p>
    </div>
    <div className="p-2 col-cell col-2">
        <p>{date.format(new Date(), 'DD/MM/YY HH:mm:ss')}</p>
    </div>
</div>

<div className='p-0 row row-cell m-auto'>
    <div className="p-2 col-cell col-6">
        <p className='boldtext'>Name</p>
    </div>
    <div className="p-2 col-cell col-4">
        <p className='boldtext'>Unit & FLoor No</p>
    </div>
    <div className="p-2 col-cell col-2 bgyellow">
        
        <p className='boldtext'>{props.location.state.value}</p>
    </div>
</div>

<div className='p-0 row row-cell m-auto'>
    <div className="p-2 col-cell col-6">
        <p className='boldtext'></p>
    </div>
    <div className="p-2 col-cell col-4">
        <p className='boldtext'>Sq.Mtr</p>
    </div>
    <div className="p-2 col-cell col-2">
        <p className='boldtext'>Sq.Ft</p>
    </div>
</div>

<div className='p-0 row row-cell m-auto'>
    <div className="p-0 col-cell col-2 flex-center">
        <p className=''>Unit Details</p>
    </div>
    <div className="p-0 col-cell col-4">
        <p className='p-2 col-cell-inner'>(a) Carpet Area</p>
        <p className='p-2 col-cell-inner'>(b) Enclosed Balcony / SitoutArea</p>
        <p className='p-2 col-cell-inner'>(c) Loft</p>
        <p className='p-2 col-cell-inner'>(d) Terrace</p>
        <p className='p-2 col-cell-inner'>Total Carpet Area</p>
    </div>
    <div className="p-0 col-cell col-4">
            <p className='p-2 col-cell-inner'>{isNaN(sheet.carpetAreaSM)?"REFUGE":sheet.carpetAreaSM}</p>
        <p className='p-2 col-cell-inner'>{sheet.enclosedBalconySM}</p>
        <p className='p-2 col-cell-inner'>0.00</p>
        <p className='p-2 col-cell-inner'>{sheet.terraceSM}</p>
        <p className='p-2 col-cell-inner'>{sheet.totalCarpetAreaSM}</p>
    </div>
    <div className="p-0 col-cell col-2">
            <p className='p-2 col-cell-inner'>{isNaN(sheet.carpetAreaSF)?"REFUGE":sheet.carpetAreaSF}</p>
        <p className='p-2 col-cell-inner'>{sheet.enclosedBalconySF}</p>
        <p className='p-2 col-cell-inner'>0.00</p>
        <p className='p-2 col-cell-inner'>{sheet.terraceSF}</p>
        <p className='p-2 col-cell-inner'>{sheet.totalCarpetAreaSF}</p>
    </div>
</div>

<div className='p-0 row row-cell m-auto'>
    <div className="p-0 col-cell col-2 flex-center">
        <p className=''>Consideration Value</p>
    </div>
    <div className="p-0 col-cell col-8">
        <p className='p-2 col-cell-inner'>Basic Value</p>
        <p className='p-2 col-cell-inner'>Car Parking Charges</p>
        <p className='p-2 col-cell-inner'>Bike Parking Charges</p>
        <p className='p-2 col-cell secbold'>Agreement Cost</p>
    </div>

    <div className="p-0 col-cell col-2">
        <p className='p-2 col-cell2'>{formatToCurrency(sheet.basicValue)}</p>
        <p className='p-2 col-cell2'>{formatToCurrency(sheet.carParkingCharges)}</p>
        <p className='p-2 col-cell2'>{formatToCurrency(sheet.bikeParkingCharges)}</p>
        <p className='p-2 col-cell2 secbold'>{formatToCurrency(sheet.agreementCost)}</p>
    </div>
</div>


<div className='p-0 row row-cell m-auto'>
    <div className="p-0 col-cell col-2 flex-center">
        <p className=''>Other Contributions</p>
    </div>
    <div className="p-0 col-cell col-8">
        <p className='p-2 col-cell-inner'>DG Backup Charges</p>
        <p className='p-2 col-cell-inner'>MSEB Charges</p>
        <p className='p-2 col-cell-inner'>Share Money, Society Formation, Water Connection, Fire Fighting System & Other Miscllenious Charges</p>
        <p className='p-2 col-cell-inner secbold'>Other Charges</p>
    </div>

    <div className="p-0 col-cell col-2">
        <p className='p-2 col-cell2'>{formatToCurrency(sheet.dgBackupCharges)}</p>
        <p className='p-2 col-cell2'>{formatToCurrency(sheet.msebCharges)}</p>
        <p className='p-2 col-cell2'>{formatToCurrency(sheet.shareMoneyCharges)}</p>
        <p className='p-2 col-cell2 secbold'>{formatToCurrency(sheet.otherCharges)}</p>
    </div>
</div>


<div className='p-0 row row-cell m-auto'>
    <div className="p-2 col-cell col-2">
        <p className=''></p>
    </div>
    <div className="p-0 col-cell col-8">
        <p className='p-2 col-cell-inner secbold'>Total Cost of Unit Excluding Govt. Taxes</p>
    </div>

    <div className="p-0 col-cell col-2">
        <p className='p-2 col-cell2 secbold'>{formatToCurrency(sheet.totalCostExcludingGovtTaxes)}</p>
    </div>
</div>


<div className='p-0 row row-cell m-auto'>
    <div className="p-0 col-cell col-2 flex-center">
        <p className=''>Goods & Service Tax</p>
    </div>
    <div className="p-0 col-cell col-8">
        <p className='p-2 col-cell-inner'>Central GST @ 6% of 2/3rd of Net Consideration (as currently applicable)</p>
        <p className='p-2 col-cell-inner'>State GST @ 6% of 2/3rd of Net Consideration (as currently applicable)</p>
     
        <p className='p-2 col-cell-inner secbold'>Total GST</p>
    </div>

    <div className="p-0 col-cell col-2">
        <p className='p-2 col-cell2'>{formatToCurrency(sheet.centralGST)}</p>
        <p className='p-2 col-cell2'>{formatToCurrency(sheet.stateGST)}</p>
      <p className='p-2 col-cell2 secbold'>{formatToCurrency(sheet.totalGST)}</p>
    </div>
</div>


<div className='p-0 row row-cell m-auto'>
    <div className="p-0 col-cell col-2 flex-center">
        <p className=''>Stamp Duty & Registration Charges</p>
    </div>
    <div className="p-0 col-cell col-8">
        <p className='p-2 col-cell-inner'>Stamp Duty @ 7%</p>
        <p className='p-2 col-cell-inner'>Registration Charges</p>
        <p className='p-2 col-cell-inner'>Legal Charges (paid by Customer at the time of Registration)</p>
        <p className='p-2 col-cell-inner secbold'>Total Stamp Duty & Registration Charges</p>
    </div>

    <div className="p-0 col-cell col-2">
        <p className='p-2 col-cell2'>{formatToCurrency(sheet.stampDuty)}</p>
        <p className='p-2 col-cell2'>{formatToCurrency(sheet.registrationCharges)}</p>
        <p className='p-2 col-cell2'>{formatToCurrency(sheet.legalCharges)}</p>
      <p className='p-2 col-cell2 secbold'>{formatToCurrency(sheet.totalStampDutyRegistrationCharges)}</p>
    </div>
</div>


<div className='p-0 row row-cell m-auto'>
    <div className="p-2 col-cell col-2">
        <p className=''></p>
    </div>
    <div className="p-0 col-cell col-8">
        <p className='p-2 col-cell-inner secbold'>Total Cost including Govt. Taxes</p>
    </div>

    <div className="p-0 col-cell col-2">
        <p className='p-2 col-cell2 secbold'>{formatToCurrency(sheet.totalCostIncludingGovtTaxes)}</p>
    </div>
</div>


<h1>Payment Schedule</h1>
        <table className="ui celled table">
        <thead>
            <tr><th>Sr No</th>
            <th>Stages of Construction</th>
            <th>% on A.V.</th>
            <th>Amount (Rs.)</th>
            <th>GST</th>
        </tr></thead>
        <tbody>
            <tr>
            <td>1</td>
            <td>9% at the time of Booking (Token Amount)</td>
            <td>9%</td>
            <td>{formatToCurrency(sheet.am1)}</td>
            <td>{formatToCurrency(sheet.amg1)}</td>
            </tr>


            <tr>
            <td>2</td>
            <td>21% at the time of registration of this agreement</td>
            <td>21%</td>
            <td>{formatToCurrency(sheet.am2)}</td>
            <td>{formatToCurrency(sheet.amg2)}</td>
            </tr>

            <tr>
            <td>3</td>
            <td>15% On Completion of Plinth</td>
            <td>15%</td>
            <td>{formatToCurrency(sheet.am3)}</td>
            <td>{formatToCurrency(sheet.amg3)}</td>
            </tr>

            <tr>
            <td>4</td>
            <td>20% On Completion of 2nd Floor Slab</td>
            <td>20%</td>
            <td>{formatToCurrency(sheet.am4)}</td>
            <td>{formatToCurrency(sheet.amg4)}</td>
            </tr>

            <tr>
            <td>5</td>
            <td>10% on completion of 5th Floor Slab</td>
            <td>10%</td>
            <td>{formatToCurrency(sheet.am4)}</td>
            <td>{formatToCurrency(sheet.amg4)}</td>
            </tr>

            <tr>
            <td>6</td>
            <td>5% On Completion of the walls, internal plaster, floorings, doors and windows upto the floor level</td>
            <td>5%</td>
            <td>{formatToCurrency(sheet.am5)}</td>
            <td>{formatToCurrency(sheet.amg5)}</td>
            </tr>

            <tr>
            <td>7</td>
            <td>5% on completion of the staircases, lift wells, lobbies upto the floor level</td>
            <td>5%</td>
            <td>{formatToCurrency(sheet.am6)}</td>
            <td>{formatToCurrency(sheet.amg6)}</td>
            </tr>

            <tr>
            <td>8</td>
            <td>5% on completion of the external plumbing, external plaster, elevation, terraces with waterproofing, of the building or wing   </td>
            <td>5%</td>
            <td>{formatToCurrency(sheet.am7)}</td>
            <td>{formatToCurrency(sheet.amg7)}</td>
            </tr>

            <tr>
            <td>9</td>
            <td>5% on completion of the lifts, water pumps, electrical fittings, electro, mechanical and environment requirements, entrance lobby/s, plinth protection, paving of areas appertain of the building or wing</td>
            <td>5%</td>
            <td>{formatToCurrency(sheet.am8)}</td>
            <td>{formatToCurrency(sheet.amg9)}</td>
            </tr>

            <tr>
            <td>10</td>
            <td>5% of the total consideration against and at the time of handing over of the possession </td>
            <td>5%</td>
            <td>{formatToCurrency(sheet.am10)}</td>
            <td>{formatToCurrency(sheet.amg10)}</td>
            </tr>

            <tr>
            <td>11</td>
            <td>DG Backup, MSEB Charges, Share Money, Society Formation, Water Connection, Fire Fighting System & Other Miscllenious Charges on Possession</td>
            <td>-</td>
            <td>{formatToCurrency(sheet.am11)}</td>
            <td>{formatToCurrency(sheet.amg11)}</td>
            </tr>

            <tr className='secbold'>
            <td colSpan={3}>Total Cost Of Unit</td>
            <td>{formatToCurrency(sheet.am1+sheet.am2+sheet.am3+sheet.am4+sheet.am5+sheet.am6+sheet.am7+sheet.am8+sheet.am9+sheet.am10+sheet.am11)}</td>
            <td>{formatToCurrency(sheet.amg1+sheet.amg2+sheet.amg3+sheet.amg4+sheet.amg5+sheet.amg6+sheet.amg7+sheet.amg8+sheet.amg9+sheet.amg10+sheet.amg11)}</td>
            </tr>

        </tbody>
</table>


<h3>Please Note</h3>

<div className="note-head">
    <p className="note">a) Date of Registration (On or Before) :</p>
</div>

<div className="note-head">
    <p className="note">b) MSEB Charges, DG Backup Charges & Corpus fund will be collected at the time of possession.</p>
</div>

<div className="note-head">
    <p className="note">c) Carpet area may change based on the new carpet area calculation as per RERA.</p>
</div>

<div className="note-head">
    <p className="note">d) Government charges / taxes are subject to change & would be applicable on actual.</p>
</div>

<div className="note-head">
    <p className="note">e) Any new born taxes & existing taxes will be paid by customers.</p>
</div>

<div className="note-head">
    <p className="note">f) The consideration of the unit has been arrived after adjusting the Input Tax Credit Benefit under GST.</p>
</div>

<div className="note-head">
    <p className="note">g) Rates & availability of units is subject to change without prior notice till booking. Any Discount Given is subject to same day booking.</p>
</div>

<div className='note-head'>
    <p className='note'>h) No modifications allowed in the unit.</p>
</div>


<div className='note-head'>
    <p className='note'>i) 1% TDS is required to be deducted by the property buyers wherein property value is more than or equal to 50 Lakhs.</p>
</div>


<div className='note-head'>
    <p className='note'>j) This is purely tentative Costing of the apartments and does not commit any availability.</p>
</div>


<div className='note-head'>
    <p className='note'>k) MAHARERA REGISTRATION NO: P52100030060 available on the website https://maharera.mahaonline.gov.in under registered projects.</p>
</div>

<div className='note-head'>
    <p className='note'>l) Maintainence charges GST ( as applicable rate ) will be paid by customer from earlier of handover of possession or occupation certificate. : <b>{formatToCurrency(sheet.maintainanceCharges)}</b></p>
</div>

<div className='note-head'>
    <p className='note'>m) All Cheques should be in the name of : A ADVANI PROPERTIES LLP LLP .</p>
</div>


<section className="row m-auto justify-content-between sign">
    <div className="col-3 sign-cont">
        <p>For A ADVANI PROPERTIES LLP LLP</p>
    </div>
    <div className="col-3 sign-cont">
        <p>For A ADVANI PROPERTIES LLP LLP</p>
    </div>
    <div className="col-3 sign-cont">
        <p>Customer Signature</p>
    </div>
</section>


    </div>

    <footer>
<Button onClick={()=>window.print()}>Print Page</Button>
</footer>
    </div>
  )
}

export default CostSheet

