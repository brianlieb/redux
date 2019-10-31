import React from 'react';
import PropTypes from 'prop-types';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import Table from '../../../common/components/Table';
import * as commonUtil from '../../../utils/commonUtil';
import {userProp} from '../../propConstants';
import NoTableData from '../../../common/components/NoTableData';
import Wrapper, {StyledForm} from "../../../person/components/IndividualSearch/styles";
import PageTitleNav from "../../../common/components/PageTitleNav";
import Form from "../../../common/components/Form";

const pagination = {
  page: 1,
  paginationSize: 25,
  sizePerPageList:
    [
      { text: '25', value: 25 },
      { text: '100', value: 100 },
    ],
};


const  myRolesFormatter = (roles) => roles.map(r => <div>- {r.roleName}</div> );
const  otherRolesFormatter = (roles) => roles.map(r => <div>+ {r.roleName}</div> );


const colDefs = () =>
  ([
    {
      text: "Username",
      sort: true,
      dataField: "username",
      formatter: name =>  name.toUpperCase(),
      editable: false,
    },
    {
      text: "Last Login",
      sort: true,
      dataField: "lastLoginDate",
      formatter: commonUtil.formatDateFromStringToMmDdYyy,
      editable: false,
    },
    {
      text: "User Roles",
      dataField: "userRoles",
      formatter: roles => myRolesFormatter(roles),
    },
    {
      text: "Other Roles",
      dataField: "otherRoles",
      formatter: roles => otherRolesFormatter(roles),
    },
  ]);

const overrideRowStyleFormat = (row)=> row.isPrimary ? { backgroundColor: '#79ce79'} : null;

function UserGrid({ users }) {
  return (
    <Wrapper>
      <PageTitleNav title='Users'  />
      <form>
        <StyledForm>
          <Form.Group>
            <Form.Item label='Username' placeholder='Username' initValue='' disabled={false} stacked />
          </Form.Group>
        </StyledForm>
      </form>
      <Table keyField='username' data={users} columns={colDefs()}
             defaultSorted ={[{dataField:'username', order:'asc'}]}
             noDataIndication={NoTableData}
             overrideRowStyle={overrideRowStyleFormat}
             pagination={pagination}/>
    </Wrapper>
  );
}

UserGrid.propTypes = {
  users: PropTypes.arrayOf(userProp),
};

export default UserGrid;


