import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { API_KEY, ROOT_URL } from './consts';
import Spinner from './Spinner';
import { BoxItem } from './BoxItem';

export class BoxList extends Component {
  state = {
    list: [72211, 10001, 88901, 60007, 94088, 12203],
    weatherList: [],
    error: undefined
  };
  componentWillMount() {
    //this.setState({ list: this.props.list });
    console.log(this.props, this.props.list);
    this.state.list.map((zip, index) => {
      const url = ROOT_URL + API_KEY + '&q=' + zip;
      fetch(url)
        .then(results => results.json())
        .then(data => {
          const weather = {
            index,
            zip,
            data
          };
          const list = this.state.weatherList;
          list.push(weather);
          this.setState({ weatherList: list });
        })
        .catch(err => this.setState({ error: err }));
    });
  }

  render() {
    let output =
      this.state.weatherList.length > 5 ? (
        <React.Fragment>
          <Row>
            <Col xs="6" sm="4">
              <BoxItem details={this.state.weatherList[0]} />
            </Col>
            <Col xs="6" sm="4">
              <BoxItem details={this.state.weatherList[1]} />
            </Col>
            <Col xs="6" sm="4">
              <BoxItem details={this.state.weatherList[2]} />
            </Col>
          </Row>
          <Row>
            <Col xs="6" sm="4">
              <BoxItem details={this.state.weatherList[3]} />
            </Col>
            <Col xs="6" sm="4">
              <BoxItem details={this.state.weatherList[4]} />
            </Col>
            <Col xs="6" sm="4">
              <BoxItem details={this.state.weatherList[5]} />
            </Col>
          </Row>
        </React.Fragment>
      ) : (
        <Spinner />
      );

    return (
      <div className="box">
        <Container>{output}</Container>
      </div>
    );
  }
}
