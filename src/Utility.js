import React, { Component } from 'react';

export default class ClientRender extends Component {
  state = { isMounted: false };

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  render() {
    const { children } = this.props;
    const { isMounted } = this.state;

    return isMounted ? children : null;
  }
}

export function optimisedImageUrl(image, transformations = '') {
  const IMAGEKIT_ENDPOINT = 'https://ik.imagekit.io/wigramdev/';
  if (image && image.hash && image.ext) {
    return IMAGEKIT_ENDPOINT + transformations + '/' + image.hash + image.ext;
  } else {
    return '';
  }
}
