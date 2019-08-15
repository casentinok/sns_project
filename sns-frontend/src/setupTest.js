import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import http from 'axios/lib/adapters/http';
import axios from 'axios';

axios.defaults.adapter = http;
Enzyme.configure({ adapter: new Adapter() });