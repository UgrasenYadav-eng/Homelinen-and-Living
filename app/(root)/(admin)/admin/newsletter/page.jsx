"use client";

import { useEffect, useState } from "react";

export default function NewsletterAdmin() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("/api/newsletter")
      .then(res => res.json())
      .then(data => setList(data.data || []));
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-semibold mb-8">
        Newsletter Subscribers
      </h1>

      <table className="w-full border">
        <thead className="bg-neutral-100">
          <tr>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Date</th>
          </tr>
        </thead>

        <tbody>
          {list.map(item => (
            <tr key={item._id} className="border-t">
              <td className="p-3">{item.email}</td>
              <td className="p-3 text-sm text-neutral-500">
                {new Date(item.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
