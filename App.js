	import React, {useState, useEffect, Snapshot} from 'react';
	import './App.css';
	import Post from './Post.js';
	import { db, auth } from './firebase.js';
	import { makeStyles } from '@material-ui/core/styles';
    import Modal from '@material-ui/core/Modal';  
    import { Button, Input } from '@material-ui/core';
	import ImageUpload from './ImageUpload';

	function getModalStyle() {
		const top = 50;
		const left = 50;
	  
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
		const [open,setOpen] =useState(false);
		const [openSignIn, setOpenSignIn] = useState(false);
		const [username, setUsername] = useState('');
		const [password, setPassword] = useState('');
		const [email, setEmail] = useState('');
		const [user,setUser] = useState(null);

		useEffect(() => {
		  const unsubscribe = auth.onAuthStateChanged((authUser) =>{
			if (authUser) {
			//user has logged in
			console.log(authUser);
			setUser(authUser);
			
			} else {	
			setUser(null); 
			}
		  })	
		  return () => {
			  // perform some cleanup actions
			  unsubscribe();
		  }
		}, [user, username]);


		//useEffect  runs a piece of of code based on a specific condition

		useEffect(() => {
			db.collection('posts').onSnapshot(snapshot => {
			// every time a new post is added, this code fires.	
			setPosts(snapshot.docs.map(doc => ({
				id: doc.id, 
				post: doc.data()
			})));
			})
		}, []);

		const signUp = (event) => {
			event.preventDefault();

			auth
			.createUserWithEmailAndPassword(email, password)
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

			auth
			.signInWithEmailAndPassword(email, password)
			.catch((error) => alert(error.message))

		setOpenSignIn(false);	
		}

		return (
		<div className="App">
			<ImageUpload />


			<Modal
			open={open}
			onClose={() => setOpen(false)}
			>

			 <div style={modalStyle} className={classes.paper}>
	    	 <form className="app_signup">
     		 	<center>
				<img
				className="app__headerImage"
				src="data:image/png;base64,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"
				alt=""
				/>
	         </center>	

		<Input
		 placeholder="username"
		 type="username"
		 value={username}
		 onChange={(e) => setUsername(e.target.value)}
		/>		
        <Input
		 placeholder="email"
		 type="text"
		 value={email}
		 onChange={(e) => setEmail(e.target.value)}
		/>
		<Input
		 placeholder="password"
		 type="password"
		 value={password}
		 onChange={(e) => setPassword(e.target.value)}
		/>
		<Button type="submit" onClick={signUp}>Sign Up</Button> 
	    </form>		 
			

			
		 </div>
	    </Modal>

		<Modal
			open={openSignIn}
			onClose={() => setOpenSignIn(false)}
		>

		 <div style={modalStyle} className={classes.paper}>
	     <form className="app_signup">
     		 <center>
				<img
				className="app__headerImage"
				src="data:image/png;base64,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"
				alt=""
				/>
	         </center>	

		
        <Input
		 placeholder="email"
		 type="text"
		 value={email}
		 onChange={(e) => setEmail(e.target.value)}
		/>
		<Input
		 placeholder="password"
		 type="password"
		 value={password}
		 onChange={(e) => setPassword(e.target.value)}
		/>
		<Button type="submit" onClick={signIn}>Sign In</Button> 
	    </form>		 
			

			
		 </div>
	    </Modal>


			<div className="app__header"> 
			<img
				className="app__headerImage"
				src="data:image/png;base64,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"
				alt=""
				/> 
			</div>


			{user ? (
			<Button onClick ={() => auth.signOut()}>Sign Out</Button>	
			): (
			 <div claasName="app__loginContainer"> 
			 <Button onClick ={() => setOpenSignIn(true)}>Sign In</Button>
			 <Button onClick ={() => setOpen(true)}>Sign Up</Button>
			 </div>
			
        	)}

			<h1> Hello there fashion students</h1>

			{
				posts.map(({id,post}) => (
				<Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
				))
			}

			
			
			</div>
		);
	}

	export default App;
