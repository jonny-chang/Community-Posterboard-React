import React, { Component } from "react";
import LocationPicker from "react-leaflet-location-picker";
import withStyles from '@material-ui/core/styles/withStyles';

// Mui
import CircularProgress from '@material-ui/core/CircularProgress'

// Redux
import { setLocation } from '../redux/actions/userActions';
import { connect } from 'react-redux';

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
    setPoint = (point) => {
        const position = {
            latitude: point[0],
            longitude: point[1]
        }
        this.props.setLocation(position)
    }
    render() {
        const { classes, data: { position }} = this.props
        const pointVals = [[position['latitude'], position['longitude']]];
        const pointMode = {
            banner: false,
            control: {
                values: pointVals,
                onClick: point => {
                    this.setPoint(point)
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
        else if (position['latitude'] !== 0 && position['longitude'] !== 0){
            return (
                <LocationPicker pointMode={pointMode} showInputs={false} showControls={false} 
                mapStyle={{ height:300, width:"auto", borderRadius: 10 }} precision={8}
                startPort={{center: [position['latitude'], position['longitude']], zoom: 12}}/>
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

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {
    setLocation
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(UtilLocationPicker));
