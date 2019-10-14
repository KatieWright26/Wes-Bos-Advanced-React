import { shallow } from 'enzyme';
import ItemComponent from '../components/Item';

const fakeItem = {
  id: 'BBC123',
  title: 'A Cool Item',
  description: 'A Rad Description',
  image: 'buyme.jpg',
  largeImage: 'BUYME.jpg',
  price: 6789,
};

describe('<Item/>', () => {
  it('renders and displays the price properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    const PriceTag = wrapper.find('PriceTag');
    expect(PriceTag.children().text()).toBe('$67.89');
    expect(wrapper.find('Title a').text()).toBe(fakeItem.title);
  });
  it('renders the image properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    const image = wrapper.find('img');
    expect(image.props().src).toBe(fakeItem.image);
    expect(image.props().alt).toBe(fakeItem.title);
  });
  it('renders out the buttons properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    const buttonList = wrapper.find('.buttonList');
    expect(buttonList.children()).toHaveLength(3);
    expect(buttonList.find('Link')).toHaveLength(1);
    expect(buttonList.find('AddToCart')).toHaveLength(1);
    expect(buttonList.find('DeleteItem')).toHaveLength(1);
  });
});
