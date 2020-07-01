import React, { Component } from 'react';
import axios from 'axios';
import Pagination from './Pagination.js';
import {AppBar,Toolbar,Typography,Grid,Card,CardActionArea,CardMedia,CardContent,Paper,InputBase,IconButton} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';




const useStyles = (theme => ({
    root: {
      flexGrow: 1, 
    },

    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.primary,
      paddingTop:"3%",
      backgroundImage:"linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)",
    },
    media: {
        display: "block",
        margin: "auto",
         width: "50%",
         height:"50%",
         borderRadius:"50%"
      },
      formstyle: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: "50%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop:"30px"
      },
      input: {
        marginLeft: theme.spacing(1),
        flex: 1,
      },
      iconButton: {
        padding: 10,
      },
  }));



 class DisplayPage extends Component {
    constructor(props){
        super(props)
        this.state={
            userData: [],
            totalResults: 0,
            currentPage: 1,
            username:""
        }
    }

   
    onchangeUserName =(e)=> {
        this.setState({
            username: e.target.value
        })  
      }


    componentDidMount(){
        axios.get("https://reqres.in/api/users?page=1")
        .then(data=> {
           // console.log(data.data)
            this.setState({
                userData:data.data.data,
                totalResults:data.data.total
            })
        })

    }

    nextPage = (pageNumber) => {
        axios.get(`https://reqres.in/api/users?page=${pageNumber}`)
        .then(data => {
          this.setState({ userData: [...data.data.data ], totalResults: data.data.total, currentPage: pageNumber})
        })
      }

    onSubmit= event =>{
        event.preventDefault();
    }

      
    render() {
        //console.log(this.state.username)
        let numberPages = Math.floor(this.state.totalResults / 6);
        const { classes } = this.props;
        //console.log(classes)
        let display;
        if(this.state.username ===""){
            display= <div style={{margin:"7%"}}>
                        <div className={classes.root} style={{marginTop:"5%",marginBottom:"5%"}}>
                            <Grid container spacing={3}  justify="center">
                            {
                                this.state.userData.map((val,index)=>{
                                    return(
                                        <Grid item  xs={12} sm={6} md={4} lg={4} >
                                            <Paper className={classes.paper}>
                                            <CardActionArea>
                                            <CardMedia
                                            className={classes.media}
                                            component="img"
                                            alt="Image Not Found"
                                            height="140"
                                            image={val.avatar}
                                            title="Image"
                                            />
                                            <CardContent>
                                            <Typography variant="h5" component="h2">
                                                {val.first_name}<span style={{marginLeft:"3%"}}></span>{val.last_name}
                                            </Typography>
                                            <p variant="body1" color="textSecondary" >
                                                {val.email}
                                            </p>
                                            </CardContent>
                                        </CardActionArea>
                                    </Paper>
                            </Grid>
                       ) })
                     }
                    </Grid>
                </div>                   
                     {this.state.totalResults > 6 && this.state.currentMovie == null ? <Pagination pages={numberPages} nextPage={this.nextPage} currentPage={this.state.currentPage}/> : ''}
                </div>
        }         
        else{
            display =  <div style={{margin:"7%"}}>
                <div className={classes.root} style={{marginTop:"5%",marginBottom:"5%"}}>
                    <Grid container spacing={3}  justify="center">
                        {
                            this.state.userData.map((val,index)=>{
                                if(this.state.username === val.first_name ||this.state.username === val.last_name ||this.state.username===val.email){
                                    return(
                                        <Grid item  xs={12} sm={6} md={4} lg={4} >
                                            <Paper className={classes.paper}>
                                            <CardActionArea>
                                            <CardMedia
                                            className={classes.media}
                                            component="img"
                                            alt="Image Not Found"
                                            height="140"
                                            image={val.avatar}
                                            title="Image"
                                            />
                                            <CardContent>
                                            <Typography variant="h5" component="h2">
                                                {val.first_name}<span style={{marginLeft:"3%"}}></span>{val.last_name}
                                            </Typography>
                                            <Typography variant="body1" color="textSecondary" component="p">
                                                {val.email}
                                            </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Paper>
                            </Grid>
                            )
                                }
                             })
                        }
                     </Grid>
                    </div>                   
                 </div> 

        }
        


        return (
            <div >
                <AppBar  position="static" style={{ backgroundImage: "linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)"}}>
                    <Toolbar >
                        <Typography variant="title" color="inherit">
                            USER PAGE
                         </Typography>
                    </Toolbar>
                </AppBar>



        <Paper component="form" className={classes.formstyle} onSubmit={this.onSubmit}>
            <IconButton className={classes.iconButton} aria-label="menu">
                <MenuIcon />
            </IconButton>
            <InputBase
                className={classes.input}
                name="username"
                Value={this.state.username}
                placeholder="Search by either first_name/last_name/email"
                onChange={this.onchangeUserName}
               
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>     
            </Paper>
                {display}
            </div>
        )
    }
}

export default withStyles(useStyles)(DisplayPage)
