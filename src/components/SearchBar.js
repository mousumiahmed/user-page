import React, { Component } from 'react'
import {Paper,InputBase,IconButton} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import DisplayPage from './DisplayPage.js';



const useStyles = (theme => ({
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


class SearchBar extends Component {
    constructor(props){
        super(props)
        this.state={
            username:""
        }
    }
    onchangeUserName =(e)=> {
        this.setState({
            username: e.target.value
        })  
    }


    render() {
        const { classes } = this.props;
        return (
            <div>
                <Paper component="form" className={classes.formstyle}>
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon/>
                    </IconButton> 
                    <InputBase
                        className={classes.input}
                        name="username"
                        Value={this.state.username}
                        placeholder="Search by either first_name/last_name/email"
                        onChange={this.onchangeUserName}                    
                    />                       
                </Paper>
                <DisplayPage username={this.state.username}/>
            </div>
        )
    }
}
export default withStyles(useStyles)(SearchBar)
