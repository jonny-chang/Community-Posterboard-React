import React, { Component } from "react";
import LocationPicker from "react-leaflet-location-picker";
import withStyles from '@material-ui/core/styles/withStyles';

// Mui
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = {
    loadingContainer: {
        height: 300,
        width: 'auto',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        textAlign: 'center',
    },
    loadingIndicator: {
        position: 'relative',
        top: '120px',
    }
}

class UtilLocationPicker extends Component{
    constructor(props){
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {
            longitude: null,
            latitude: null,
            error: false
        }
    }
    componentDidMount(){
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude
                })               
            },
            (error) => {
                this.setState({
                    error: true
                })
            }
            )
        } 
    }
    render() {
        const { classes } = this.props
        const pointVals = [];
        const pointMode = {
            banner: false,
            control: {
            values: pointVals,
            onClick: point => {
                pointVals.pop()
                pointVals.push(point)
                }
            }
        };
        if (!("geolocation" in navigator) || this.state.error === true){
            return (
                <LocationPicker pointMode={pointMode} showInputs={false} showControls={false} 
                mapStyle={{ height:300, width:"auto", borderRadius: 10 }} precision={8}
                startPort={"default"}/>
            )
        }
        else if (this.state.latitude !== null && this.state.longitude !== null){
            return (
                <LocationPicker pointMode={pointMode} showInputs={false} showControls={false} 
                mapStyle={{ height:300, width:"auto", borderRadius: 10 }} precision={8}
                startPort={{center: [this.state.latitude, this.state.longitude], zoom: 12}}/>
            )
        }
        else {
            return (
                <div className={classes.loadingContainer}>
                    <CircularProgress size={60} className={classes.loadingIndicator}/>                
                </div>
            )
        }
    }
};

 
export default withStyles(styles)(UtilLocationPicker);