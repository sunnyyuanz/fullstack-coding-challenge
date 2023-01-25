import React from 'react';

export default function TopComplaints(props) {
  const typeColumns = ['Top Complaints Types'];
  const topComplaintsTypes = props.topComplaintsTypes;
  
  return (
    <div className="tableWrapper">
      <table>
        <thead>
          <tr>
            {typeColumns.map((c, i) => (
              <th key={i}>{c}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {topComplaintsTypes.map((ct) => (
            <tr key={ct}>
              <td>{ct}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
