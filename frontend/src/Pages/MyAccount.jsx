import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { date } from 'zod';

const MyAccount = () => {
  const user = useSelector((state)=>state.user);
  const [contributions, setContributions] = useState([{id: '1', projectId: '23je0409', projectTitle: 'Jarvis 2.0', amount: 5000}]);
  const [createdProjects, setCreatedProjects] = useState([{id: '1', status: 'Done', title: 'Megatronics'}]);
  const [paymentHistory, setPaymentHistory] = useState([{id: '1', projectTitle: 'Jarvis 1.0', amount: 3000, date: new Date(Date.now())}]);

  useEffect(() => {
    fetchUserData();
    fetchContributions();
    fetchCreatedProjects();
    fetchPaymentHistory();
  }, []);

  const fetchUserData = async () => {
    const userData = await fetch('/api/user').then(res => res.json());
    setUser(userData);
  };

  const fetchContributions = async () => {
    const contributionData = await fetch('/api/user/contributions').then(res => res.json());
    setContributions(contributionData);
  };

  const fetchCreatedProjects = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/project/getAllProject',{withCredentials: true});
      if(response){
        setCreatedProjects(response.data.data.projects)
      }
    } catch (error) {
      console.log(error)
    }
  };

  const fetchPaymentHistory = async () => {
    const paymentData = await fetch('/api/user/payments').then(res => res.json());
    setPaymentHistory(paymentData);
  };
  const navigate = useNavigate();
  const handleClose = () =>{
    navigate('/')
  }
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className='flex items-center justify-between'>
      <h1 className="text-3xl font-bold mb-6">My Account</h1>
      <button onClick={handleClose}>Close</button>
      </div>
      {/* Profile Section */}
      <div className="flex items-center mb-8">
        <img
          className="w-24 h-24 rounded-full mr-6"
          src={user.avatarImage || '/default-avatar.png'}
          alt="Profile"
        />
        <div>
          <h2 className="text-2xl font-semibold">{user.username}</h2>
          <p className="text-gray-600">Email: {user.email}</p>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Contributions Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">My Contributions</h2>
        <ul className="space-y-4">
          {contributions.map((contribution) => (
            <li key={contribution.id} className="p-4 border rounded shadow">
              <a href={`/projects/${contribution.projectId}`} className="text-lg font-semibold text-blue-600 hover:underline">
                {contribution.projectTitle}
              </a>
              <p className="text-gray-600">Amount Contributed: ${contribution.amount}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Created Projects Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">My Projects</h2>
        <ul className="space-y-4">
  {createdProjects.map((project) => {
    const fundsCollected = project.fundsCollected || 0; // Default to 0 if undefined
    const totalFundsRequired = project.totalFundsRequired || 1; // Avoid division by zero
    const percentage = Math.min((fundsCollected / totalFundsRequired) * 100, 100); // Calculate percentage, clamp to 100%

    return (
      <li
        key={project._id}
        className={project.status === 'Completed' ? 'p-4 border rounded shadow bg-green-400' : 'p-4 border rounded shadow'}
      >
        <div>
          <a href={`/projects/${project._id}`} className="text-lg font-semibold text-blue-600 hover:underline">
            {project.name}
          </a>
          <p className="text-gray-600">Status: {project.status}</p>
        </div>
        
        {/* Progress Bar */}
        <div className="relative w-full h-4 bg-gray-200 rounded">
          <div
            className="absolute h-full bg-green-500 rounded"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p>{`${fundsCollected} / ${totalFundsRequired}`}</p>
      </li>
    );
  })}
</ul>

      </div>

      {/* Payment History Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Payment History</h2>
        <ul className="space-y-4">
          {paymentHistory.map((payment) => (
            <li key={payment.id} className="p-4 border rounded shadow">
              <p className="text-gray-600">Project: {payment.projectTitle}</p>
              <p className="text-gray-600">Amount: ${payment.amount}</p>
              <p className="text-gray-600">Date: {new Date(payment.date).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyAccount;
