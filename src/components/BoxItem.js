import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { API_KEY, ROOT_URL } from './consts';
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Col,
  Row,
  CardImg,
  Badge
} from 'reactstrap';
import Spinner from './Spinner';

export class BoxItem extends Component {
  static propTypes = {
    prop: PropTypes
  };
  constructor(props) {
    super(props);
    this.state = {
      zipcode: this.props.details.zip,
      weather: this.props.details.data,
      index: this.props.details.index,
      error: undefined,
      color: 'primary'
    };
    this.zipcodeEle = React.createRef();

    let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    this.date = d;
  }
  componentWillMount() {
    let color = this.setColor(this.state.weather);
    this.setState({ color });
  }

  setColor(weather) {
    let color = 'primary';
    const temp = Number(weather.current.temp_f);
    if (temp <= 30) {
      color = 'snow';
    } else if (temp > 30 && temp < 50) {
      color = 'moderate';
    } else if (temp >= 50) {
      color = 'red';
    }
    return color;
  }
  enterKeyHandler(e) {
    var code = e.keyCode || e.which;
    if (code === 13) this.clickHandler(e);
    return e;
  }
  clickHandler(e) {
    e.preventDefault();
    const zipcode = this.zipcodeEle.current.value;
    if (zipcode.length <= 0) return;

    const url = ROOT_URL + API_KEY + '&q=' + zipcode;
    fetch(url)
      .then(results => results.json())
      .then(data => {
        let color = this.setColor(data);
        this.setState({ zipcode, weather: data, color });
      })
      .catch(err => this.setState({ error: err }));
  }
  render() {
    let output = this.state.weather ? (
      <div className="box">
        <Card>
          <CardBody>
            <Row>
              <Col sm="8" lg="8">
                <input
                  placeholder="Enter Zipcode Or City"
                  defaultValue={this.state.zipcode}
                  minLength="5"
                  ref={this.zipcodeEle}
                  onKeyPress={this.enterKeyHandler.bind(this)}
                />
              </Col>
              <Col sm="4" lg="4">
                <Button color="info" onClick={this.clickHandler.bind(this)}>
                  load
                </Button>
              </Col>
            </Row>
            {this.state.weather.error ? (
              this.state.weather.error.message
            ) : (
              <React.Fragment>
                <h3>
                  <Badge color={this.state.color} className={this.state.color}>
                    {this.state.weather.location.name}{' '}
                    {new Date(this.state.weather.location.localtime).getHours()}
                    {'-'}
                    {new Date(
                      this.state.weather.location.localtime
                    ).getMinutes()}
                  </Badge>
                </h3>
                <h4>
                  <Badge color={this.state.color} className={this.state.color}>
                    {this.state.weather.current.condition.text}{' '}
                    {this.state.weather.current.temp_f}
                  </Badge>

                  <img src={this.state.weather.current.condition.icon} />
                </h4>
                <h5>
                  <Badge color={this.state.color} className={this.state.color}>
                    Wind: {this.state.weather.current.wind_mph} MPH -{' '}
                    {this.state.weather.current.wind_kph} KPH
                    {' - '}
                    Dir: {this.state.weather.current.wind_dir}
                  </Badge>
                </h5>

                <Badge>Cloud -{this.state.weather.current.cloud}</Badge>
                <Badge>Humidity - {this.state.weather.current.humidity} </Badge>
                <h5>
                  <Badge>
                    Feels Like - {this.state.weather.current.feelslike_f}
                  </Badge>
                </h5>
              </React.Fragment>
            )}
          </CardBody>
        </Card>
      </div>
    ) : (
      <Spinner />
    );
    return output;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoxItem);
