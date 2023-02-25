import { useNavigate } from '@shopify/app-bridge-react';
import {IndexTable, LegacyCard, Text, Avatar, Button} from '@shopify/polaris';
import React from 'react';
import { useAppQuery } from '../../hooks';

export function UserTable() {
  const navigate = useNavigate()

  const {data, isLoading} = useAppQuery({
    url: "/api/customer/all",
    
  })
  const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };


  const rowMarkupData = data?.map(
    ({id, first_name, last_name, orders_count, email}, index) => (
      
        <IndexTable.Row id={id} key={id} position={index}>
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {first_name} {last_name}
          </Text>
        </IndexTable.Cell>
         <IndexTable.Cell>{email}</IndexTable.Cell>
        <IndexTable.Cell>{orders_count}</IndexTable.Cell>
        <IndexTable.Cell><Button size='slim' primary onClick={() => navigate(`/user/${id}`)}>edit</Button></IndexTable.Cell>
      </IndexTable.Row>

      
      
    ),
  );

  return (
    
    <LegacyCard>
      <IndexTable
        resourceName={resourceName}
        itemCount={isLoading?0:data.length}
        headings={[
          {title: "Name"},
          {title: 'Email'},
          {title: 'Order count'}
        ]}
        selectable={false}
        loading={isLoading}
      >
        {rowMarkupData}
      </IndexTable>
    </LegacyCard>
  );
}