import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import SickButton from './styles/SickButton';
import Table from './styles/Table';
import Error from './ErrorMessage';

const possiblePermissions = [
  'ADMIN',
  'USER',
  'ITEMCREATE',
  'ITEMUPDATE',
  'ITEMDELETE',
  'PERMISSIONUPDATE',
];

const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      permissions
    }
  }
`;

const Permissions = props => (
  <Query query={ALL_USERS_QUERY}>
    {({ data, loading, error }) =>
      console.log(data) || (
        <div>
          <Error error={error} />
          <div>
            <h1>Manage Permissions</h1>
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  {possiblePermissions.map(permission => (
                    <th>{permission}</th>
                  ))}
                  <th>v</th>
                </tr>
              </thead>
              <tbody>
                {data.users.map(user => (
                  <User user={user} />
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      )
    }
  </Query>
);

class User extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        {possiblePermissions.map(permission => (
          <td>
            <label htmlFor={`${user.id}-permission-${permission}`}>
              <input type="checkbox" />
            </label>
          </td>
        ))}
        <SickButton>Update</SickButton>
        <td />
      </tr>
    );
  }
}
export default Permissions;
