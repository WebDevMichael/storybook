import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { logger } from '@storybook/client-logger';

interface Props {
  query: string;
}
interface GiphyState {
  src?: string;
}
export default class Giphy extends Component<Props, GiphyState> {
  state = {
    src: null,
  };
  componentDidMount() {
    const { query } = this.props;
    // TODO: replace this api_key, and make it configurable
    // note: I have requested a production api_key:
    // it's pending: bluXZc8ZAre19mvTtVi900CdsJhbVTEK
    fetch(`http://api.giphy.com/v1/gifs/search?limit=1&api_key=dc6zaTOxFJmzC&q=${query}`)
      .then(response => response.ok && response.json())
      .then(data => {
        this.setState({
          src: data.data[0].images.original.url,
        });
      })
      .catch(e => logger.error(e));
  }
  render() {
    const { src } = this.state;
    // TODO: we should have a nice looking <Img /> component
    return src ? <img src={src} /> : null;
  }
}