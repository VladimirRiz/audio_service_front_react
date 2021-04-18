import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/',
  //   headers: {
  //     Authorization: `Bearer ${this.props.token}`,
  //   },
});

export default instance;
