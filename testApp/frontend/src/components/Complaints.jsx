import React from 'react';

export default function Complaints({ complaints }) {
  const complaintsColumns = [
    'account',
    'city',
    'opendate',
    'council_dist',
    'borough',
    'complaint_type',
    'descriptor',
  ];

  return (
    <div className="tableWrapper">
      <table>
        <thead>
          <tr>
            {complaintsColumns.map((c, i) => (
              <th key={i}>{c.split('_').join(' ')}</th>
            ))}
          </tr>
        </thead>
        <tbody>{complaints &&
            complaints.map((c, i) => {
              return (<tr key={i}>{complaintsColumns.map((col, i) => (
                    <td key={i}>{c[col]?c[col]:null}</td>
                  ))}</tr>
              );
            })}</tbody>
      </table>
    </div>
  );
}
