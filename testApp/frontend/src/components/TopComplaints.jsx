import React from 'react';

export default function TopComplaints(props) {
  const typeColumns = ['Top Complaints Types', 'Counts'];
  const topComplaintsTypes = props.topComplaintsTypes;
  const keys = Object.keys(topComplaintsTypes);
  const values = Object.values(topComplaintsTypes);
  console.log(topComplaintsTypes);

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
          {keys.map((k, i) => (
            <tr key={i}>
              <td key={i}>{k}</td>
              <td key={i + 1}>{values[i]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
