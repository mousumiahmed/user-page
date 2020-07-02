import React, { Component } from 'react';
import axios from 'axios';
import Pagination from './Pagination.js';
import {Typography,Grid,Card,CardActionArea,CardMedia,CardContent,Paper,InputBase,IconButton} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';





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
      fontstyle:{
        fontFamily: "Roboto",
        fontWeight: "600",
        color:"#fff"
      }
  }));



 class DisplayPage extends Component {
    constructor(props){
        super(props)
        this.state={
            userData: [],
            totalResults: 0,
            currentPage: 1,
        }
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
        .catch(error => {
            console.log(error)
        });

    }

    changePage = (pageNumber) => {
        axios.get(`https://reqres.in/api/users?page=${pageNumber}`)
        .then(data => {
          this.setState({ userData: [...data.data.data ], totalResults: data.data.total, currentPage: pageNumber})
        })
        .catch(error => {
            console.log(error)
        });
      }

 
    render() {
        //console.log(this.state.username)
        let numberPages = Math.floor(this.state.totalResults / 6);
        const { classes } = this.props;
        //console.log(classes)
      
        if(this.props.username ===""){
            return(<div style={{margin:"7%"}}>
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
                                            <CardContent className={classes.fontstyle}>
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
                     {this.state.totalResults > 6 && this.state.currentMovie == null ? <Pagination pages={numberPages} changePage={this.changePage} currentPage={this.state.currentPage}/> : ''}
                </div>
            )
        }         
        else{
            return( <div style={{margin:"7%"}}>
                <div className={classes.root} style={{marginTop:"5%",marginBottom:"5%"}}>
                    <Grid container spacing={3}  justify="center">
                        {
                            this.state.userData.map((val,index)=>{
                                if(this.props.username === val.first_name||this.props.username === val.first_name.toLowerCase() ||this.props.username === val.last_name||this.props.username === val.last_name.toLowerCase() ||this.props.username===val.email){
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
                                            <CardContent className={classes.fontstyle}>
                                            <Typography variant="h5" component="h2">
                                                {val.first_name}<span style={{marginLeft:"3%"}}></span>{val.last_name}
                                            </Typography>
                                            <Typography variant="body1" component="p">
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
            )
        }
    }
}

export default withStyles(useStyles)(DisplayPage)
