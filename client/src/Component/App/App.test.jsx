import { configure,shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
configure({ adapter: new Adapter() });

import App from './App';

const props=
      {
       data: [{
      id: 1,
      name: 'redux ',
      description: 'server side',
      completed: false,
      date: '03/02/2023 12:05:02'
              }]
  }

it("renders without crashing", () => {
  shallow(<App details={props} />);
});
