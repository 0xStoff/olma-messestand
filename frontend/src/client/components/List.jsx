import { Card, Table } from "react-bootstrap";

const List = (props) => {
  let clients = props.query.response;
  let mapClients;

  if (clients !== undefined && clients.data.length > 0) {
    clients = clients.data;
    mapClients = clients.map((client, i) => {
      return (
        <tr key={i}>
          <td>{client.vorname}</td>
          <td>{client.name}</td>
          <td>{client.geburtsdatum}</td>
          <td>{client.adresse}</td>
          <td>{client.plz}</td>
          <td>{client.telefonnummer}</td>
          <td>{client.email}</td>
        </tr>
      );
    });
  }

  return (
    <div className="m-3">
      <Card className="participants">
        <Card.Body>
          <Table>
            <thead>
              <tr>
                <th>Vorname</th>
                <th>Nachname</th>
                <th>Geburtsdatum</th>
                <th>Adresse</th>
                <th>PLZ</th>
                <th>Telefon</th>
                <th>E-Mail</th>
              </tr>
            </thead>
            <tbody>{mapClients}</tbody>
          </Table>
        </Card.Body>{" "}
      </Card>
    </div>
  );
};

export default List;
