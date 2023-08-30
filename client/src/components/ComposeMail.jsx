import { useState } from 'react';

import { Dialog, styled, Typography, Box, InputBase, TextField, Button } from '@mui/material'; 
import { Close, DeleteOutline } from '@mui/icons-material';
import useApi from '../hooks/useApi';  // importing use api custom hook
import { API_URLS } from '../services/api.urls';

const dialogStyle = {    // a function called by paperprops to set the design of dialog box
    height: '90%',
    width: '80%',
    maxWidth: '100%',   // by default it is different and so we need to fix it here
    maxHeight: '100%',  // by default it is different and so we need to fix it here
    boxShadow: 'none',
    borderRadius: '10px 10px 0 0',  // topleft, topright,bottomleft,bottomright radius of border
}
// using styled to apply styles and flex aligns all buttons in a line(applied on parent and aligns all child in one line)
// space between take the two things to different ends
// typography by default 16 pixel size
// &>p allow us to access the p tag(typography) of the parent box and apply visual changes to it
const Header = styled(Box)`
    display: flex;  
    justify-content: space-between;
    padding: 10px 15px;
    background: #f2f6fc;
    & > p {
        font-size: 14px;
        font-weight: 500;
    }
`;
// wrapper below has two placeholder(textfields) which show the by default hint to what to write here
// flex direction column arranges the two fields one under the another
// accessing the div tag of inputbase(receipent and subject) and applying properties on it
const RecipientWrapper = styled(Box)`
    display: flex;
    flex-direction: column;  
    padding: 0 15px;
    & > div {
        font-size: 14px;
        border-bottom: 1px solid #F5F5F5;
        margin-top: 10px;
    }
`;
// flex in footer aligns all items in a line
const Footer = styled(Box)`
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    align-items: center;
`;
// send button is styled version of button and we define styling here only
// by default text tranform makes letter in capital and so switch it off we have to put none    
const SendButton = styled(Button)`
    background: #0B57D0;
    color: #fff;
    font-weight: 500;
    text-transform: none;  
    border-radius: 18px;
    width: 100px;
`

const ComposeMail = ({ open, setOpenDrawer }) => {
    const [data, setData] = useState({});  // data usestate to extract data
    const sentEmailService = useApi(API_URLS.saveSentEmails);  // used from api urls that what mehtod needed to be applied 
    const saveDraftService = useApi(API_URLS.saveDraftEmails);
    // in config we we directly enter the username and password, then it will be publically visible, which is not good
    const config = {   // these are all the info
        Host: "smtp.elasticemail.com",
        Username: "prateekjain@yopmail.com",  // to pickup values from the env file we use this syntax
        Password: "CB512109CA308B250BD91AD29E0ADBD0DC61",
        Port: 2525,
    }

    const onValueChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })  // key is variable then it needs to be wrapped in [], its a key value pair
    }  // target.name helps to distinguish between fields sended (subject,receipent) and value gives the value entered

    const sendEmail = async (e) => {
        e.preventDefault();

        if (window.Email) {
            window.Email.send({  // because email will be attached to the window
                ...config,  // config is sprEAD USING SPREAD OPERATOR
                To : data.to,
                From : "prateekjain.652@gmail.com",
                Subject : data.subject,
                Body : data.body
            }).then(
                message => alert(message)
            );
        }

        const payload = {   // payload containing info. of mail
            to : data.to,
            from : "prateekjain.652@gmail.com",
            subject : data.subject,
            body : data.body,
            date: new Date(),
            image: '',
            name: 'Prateek',
            starred: false,
            type: 'sent'
        }

        sentEmailService.call(payload);  // data,request all sended to 

        if (!sentEmailService.error) {
            setOpenDrawer(false);
            setData({});
        } else {

        }
    }

    const closeComposeMail = (e) => {
        e.preventDefault();  // browser kee default properties ko stop karne kei liye

        const payload = {
            to : data.to,
            from : "prateekjain.652@gmail.com",
            subject : data.subject,
            body : data.body,
            date: new Date(),
            image: '',
            name: 'Code for Interview',
            starred: false,
            type: 'drafts'
        }

        saveDraftService.call(payload);

        if (!saveDraftService.error) {
            setOpenDrawer(false);  // we set the property to false i.e. close the pop up
            setData({});
        } else {

        }
    }
    // we have three boxes to wrap the header portion, the receipent,subject area and the third box is used for writing the text
    // so we divided the compose dialog box in 3 sections
    // in header we used the typography for writing new message and used the close icon by material ui(imported the icon)
    return (
        <Dialog
            open={open}  
            PaperProps={{ sx: dialogStyle }}  // it is like props where we are abel to send objects and this allows us to define dialogstyle and change the design here only
        >  
            <Header>  
                <Typography>New Message</Typography>  
                <Close fontSize="small" onClick={(e) => closeComposeMail(e)} />
            </Header> 
            <RecipientWrapper  > 
                
                <InputBase placeholder='Recipients' name="to" onChange={(e) => onValueChange(e)} value={data.to}   //to is the key and the value entered here will be set in data.to
                 />    
                <InputBase placeholder='Subject' name="subject" onChange={(e) => onValueChange(e)} value={data.subject} />
            </RecipientWrapper> 
            
            <TextField   // textfield used whose prop multiline is used to enable writing long texts in multiline
                multiline
                rows={20}  // 20 rows space is there
                sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }} // sx is used to handle internal props/class and the class written is taken from inspecting the page 
                name="body"
                onChange={(e) => onValueChange(e)}
                value={data.body}
            />
            
            <Footer> 
                <SendButton onClick={(e) => sendEmail(e)}>Send</SendButton>    
                <DeleteOutline onClick={() => setOpenDrawer(false)}  />   
            </Footer>
        </Dialog>
        // (e) kisne event ko trigger kiya, kyu kiya etcc.. info 
        // deleteoutline mei we have set the state of opendrawer to false
        // on click of send button we need to close pop up and send the email       
        // the delete outline icon is imported and used as an component here and send button(a styled component of button) also
    )   // in receipent wrapper we apply onchange property on receipent and subject to detect change and trigger some action whenever user enter something in it
}

export default ComposeMail;