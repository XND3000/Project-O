import React,  {useState, useEffect}  from "react";
import './App.css';
import Post from './Post.js';
import {db , auth} from './firebase.js';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Button,Input} from '@material-ui/core';
import ImgUpload from './ImageUpload';
//import InstagramEmbed from 'react-instagram-embed';
import firebase from 'firebase';
import Sidebar from './SideBar.js';



function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open , setOpen] = useState(false);
  const [openSignIn , setOpenSignIn] = useState(false);
  const [email , setEmail] = useState('');
  const [username , setUsername] = useState('');
  const [password , setPassword] = useState('');
  const [user , setUser] = useState(null);
  useEffect(() => {
    const unsubscribe= auth.onAuthStateChanged((authUser) => {
      if(authUser){
        console.log(authUser);  
        setUser(authUser);
        if(authUser.displayName){

        }else{
          return authUser.updateProfile({
            displayName: username,
          });
        }
      }else{
        setUser(null);
      }
    })
    return () => {
      unsubscribe();
    }
  },[user , username]);
   useEffect(() => {
    db.collection('posts').orderBy('timestamp','desc').onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map(doc=>({
          id: doc.id,
          post : doc.data()
        })
      ));
    })
  }, []);

  const signUp = (event) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email , password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message));
    setOpen(false);
  }

  const signIn = (event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email , password)
    
    .catch((error) => alert(error.message));
    setOpenSignIn(false);
  }

  return (
    <div className="app">

   
      
      <Modal
        open={open}
        onClose={()=> setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className = "app__signUp">
        <center>
          <img className="app__headerimage" alt="abc" src=""></img>
         </center>
          <Input
          type='text'
          placeholder='username'
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          />
          <Input
          type='email'
          placeholder='email'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          />
          <Input
          type='password'
          placeholder='password'
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          />
          <Button type="submit"   onClick={signUp}>Sign Up</Button>
        
          </form>
        </div>
      
      </Modal>
      <Modal
        open={openSignIn}
        onClose={()=> setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className = "app__signUp">
        <center>
          <img className="app__headerimage" alt="abc" src="https://unimailwinchesterac-my.sharepoint.com/personal/d_farr_19_unimail_winchester_ac_uk/Documents/Microsoft%20Teams%20Chat%20Files/Alt%20Logo.png"></img>
         </center>
          <Input
          type='email'
          placeholder='email'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          />
          <Input
          type='password'
          placeholder='password'
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          />
          <Button type="submit"   onClick={signIn}>Sign In</Button>
        
          </form>
        </div>
      
      </Modal>
      <div className="app__header">
        
          <img className="app__headerimage" alt="abc" src="https://unimailwinchesterac-my.sharepoint.com/personal/d_farr_19_unimail_winchester_ac_uk/Documents/Microsoft%20Teams%20Chat%20Files/Alt%20Logo.png"></img>
          {user ? (
        <Button onClick ={()=>auth.signOut()}>Logout</Button>
        ): (
        <div className = "app__loginContainer">
        <Button onClick ={()=>setOpen(true)}>Sign Up</Button>
        <Button onClick ={()=>setOpenSignIn(true)}>Sign In</Button>
        </div>
      )}
      </div>
      <div className="app_body">
      <Sidebar />
     </div>
   
      <div className= 'app__posts'>
          <div className = "app__postsLeft">

            {posts.map( ({id , post})  => (
              <Post
                key = {id}
                postId={id}
                user={user}
                username={post.username}
                caption={post.caption}
                imgUrl={post.imgUrl}
              />
            ))}
          </div>
         
      </div>

      {user?.displayName ? (<ImgUpload username= {user.displayName} />):(<h3>Sorry you need to login !!</h3>)}
    </div>

  );
}










export default App;

// {
//   username : "UserName1",
//   caption: "Caption1",
//   imgUrl: "https://e7.pngegg.com/pngimages/712/1009/png-clipart-letter-instagram-font-instagram-text-logo.png"
// },{
//   username : "UserName2",
//   caption: "Caption2",
//   imgUrl: "https://e7.pngegg.com/pngimages/712/1009/png-clipart-letter-instagram-font-instagram-text-logo.png" 
// }
