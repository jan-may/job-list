import React, { useState } from "react";
import { Data } from "./data.js";
import images from "./images";

export default function Jobs() {
  const [jobs, setJobs] = useState(Data);
  const [filtered, setFiltered] = useState([]);
  const [deleted, setDeleted] = useState();

  const handleClear = () => {
    setJobs(Data);
    setFiltered([]);
  };

  const handleFilterLevel = (e) => {
    setJobs(jobs.filter((job) => job.level === e.target.innerText));
    filtered.includes(e.target.innerText) === false &&
      setFiltered([...filtered, e.target.innerText]);
  };
  const handleFilterLang = (e) => {
    setJobs(jobs.filter((job) => job.languages.includes(e.target.innerText)));
    filtered.includes(e.target.innerText) === false &&
      setFiltered([...filtered, e.target.innerText]);
  };
  const handleFilterTools = (e) => {
    setJobs(jobs.filter((job) => job.tools.includes(e.target.innerText)));
    filtered.includes(e.target.innerText) === false &&
      setFiltered([...filtered, e.target.innerText]);
  };

  const handleFilterRole = (e) => {
    setJobs(jobs.filter((job) => job.role === e.target.innerText));
    filtered.includes(e.target.innerText) === false &&
      setFiltered([...filtered, e.target.innerText]);
  };

  const handleDelete = (e) => {
    let res = filtered.filter(
      (f) => f !== e.target.parentElement.firstChild.data
    );
    setFiltered(res);
    setDeleted(e.target.parentElement.firstChild.data);
  };

  React.useEffect(() => {
    setJobs(Data);
    if (filtered.length === 0) {
      setJobs(Data);
    }
    for (let i = 0; i < filtered.length; i++) {
      let temp = [];
      Data.filter((job) => {
        if (job.level === filtered[i]) {
          temp.push(job);
        }
        if (job.role === filtered[i]) {
          temp.push(job);
        }
        if (job.languages.includes(filtered[i])) {
          temp.push(job);
        }
        if (job.tools.includes(filtered[i])) {
          temp.push(job);
        }
      });
      setJobs(temp);
    }
  }, [deleted]);

  return (
    <>
      <header className="bg-Top"></header>
      <div className="main-Wrapper">
        {filtered.length > 0 && (
          <article className="filter">
            <div className="filter-btns">
              {filtered.map((name) => (
                <div className={"filter-wrapper"}>
                  {name}
                  <button id="test11" onClick={handleDelete}>
                    X
                  </button>
                </div>
              ))}
            </div>
            <button id="clear-btn" onClick={handleClear}>
              Clear
            </button>
          </article>
        )}

        {jobs.map((job, index) => {
          return (
            <article className={job.featured && "feautured"}>
              <div className="job-img-Wrapper">
                <img src={images[job.id - 1]} alt={`${job.company} logo`} />
              </div>
              <div className="job-desc-Wrapper">
                <div className="flex-wrapper">
                  <p className="desc-company">{job.company}</p>
                  <div className={job.newJob && "desc-new"}>
                    <p>{job.newJob && "new!"}</p>
                  </div>

                  <p className={job.featured && " desc-new desc-featured"}>
                    {job.featured && "featured"}
                  </p>
                </div>
                <h3>{job.position}</h3>
                <ul>
                  <li id="no-deko">{job.postedAt}</li>
                  <li>{job.contract}</li>
                  <li>{job.location}</li>
                </ul>
              </div>
              <div className="job-skills">
                <button onClick={handleFilterRole}>{job.role}</button>
                <button onClick={handleFilterLevel}>{job.level}</button>
                {job.tools.map((tool) => {
                  return <button onClick={handleFilterTools}>{tool}</button>;
                })}
                {job.languages.map((lan) => {
                  return <button onClick={handleFilterLang}>{lan}</button>;
                })}
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
