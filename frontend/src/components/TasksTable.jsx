import { ExternalLink } from 'lucide-react'
import React, { useState, useEffect } from 'react'

const TasksTable = ({ data }) => {
  const [search, setSearch] = useState("")
  const [tableData, setTableData] = useState(data)

  // 🔹 Update filtered data when search changes
  useEffect(() => {
    setTableData(
      data.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [search, data]) // 👈 also depend on data!

  // 🔹 Also update tableData whenever `data` changes (even if no search)
  useEffect(() => {
    setTableData(data)
  }, [data])

  return (
    <div className="w-full flex flex-row justify-center mt-3">
      <div className="min-w-[80%] max-w-full">
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            required
            placeholder="Pretraga po nazivu zadatka"
            value={search}
            onInput={(e) => setSearch(e.target.value)}
          />
        </label>

        <div className="overflow-x-auto mt-4 rounded-box border border-base-content/5 bg-base-100">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Naziv zadatka</th>
                <th>Tip</th>
                <th>Lekcija</th>
                <th>Status</th>
                <th>Opcije</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>
                    <a href={`/assignment/${item._id}/view`}>
                      {item.title}
                      <ExternalLink className="inline w-4 h-4 ml-0.5 text-[#474747]" />
                    </a>
                  </td>
                  <td>{item.type === "groupwork" ? "Grupni rad" : item.type === "homework" ? "Domaći zadatak" : item.type === "additional" ? "Zadatak za više" : ""}</td>
                  <td>
                    <a href={`/lesson/${item.lessonref._id}`}>
                     {item.lessonref.title}
                                           <ExternalLink className="inline w-4 h-4 ml-0.5 text-[#474747]" />

                     </a>
                   
                    
                    </td>
                  <td>
                    <div
                      className={`badge ${
                        item.status === "Zadato"
                          ? "badge-info"
                          : item.status === "Pokušaj ponovo"
                          ? "badge-error"
                          : item.status === "Prihvaćeno"
                          ? "badge-success"
                          : item.status === "Čeka na pregled"
                          ? "badge-warning"
                          : ""
                      }`}
                    >
                      {item.status}
                    </div>
                  </td>
                  <td>
                    <a href={`/assignment/${item._id}/view` } target="_blank">
                    <button
                      className="btn btn-sm tooltip tooltip-info"
                      data-tip="Otvori zadatak"
                    >
                      <ExternalLink className="size-4" />
                    </button>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TasksTable
