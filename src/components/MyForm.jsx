import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function MyForm() {
  const [formData, setFormData] = useState({
    customer: '',
    docRef: '',
    enquiryRef: '',
    quotation: '',
    itemTag: '',
    date: '',
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/view", { state: formData });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-[14px]">
      <div className="bg-white p-8 rounded-xl shadow-md w-[700px]">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-x-10 gap-y-4">
            <div className="flex items-center">
              <label className="w-[110px]">Customer:</label>
              <input
                type="text"
                name="customer"
                value={formData.customer}
                onChange={handleChange}
                className="bg-[#dde6e9] h-[2.1875rem] w-full rounded-[5px] px-2"
              />
            </div>
            <div className="flex items-center">
              <label className="w-[110px]">Doc. Ref.:</label>
              <input
                type="text"
                name="docRef"
                value={formData.docRef}
                onChange={handleChange}
                className="bg-[#dde6e9] h-[2.1875rem] w-full rounded-[5px] px-2"
              />
            </div>
            <div className="flex items-center">
              <label className="w-[110px]">Enquiry Ref.:</label>
              <input
                type="text"
                name="enquiryRef"
                value={formData.enquiryRef}
                onChange={handleChange}
                className="bg-[#dde6e9] h-[2.1875rem] w-full rounded-[5px] px-2"
              />
            </div>
            <div className="flex items-center">
              <label className="w-[110px]">Quotation:</label>
              <input
                type="text"
                name="quotation"
                value={formData.quotation}
                onChange={handleChange}
                className="bg-[#dde6e9] h-[2.1875rem] w-full rounded-[5px] px-2"
              />
            </div>
            <div className="flex items-center">
              <label className="w-[110px]">Item /tag:</label>
              <input
                type="text"
                name="itemTag"
                value={formData.itemTag}
                onChange={handleChange}
                className="bg-[#dde6e9] h-[2.1875rem] w-full rounded-[5px] px-2"
              />
            </div>
            <div className="flex items-center">
              <label className="w-[110px]">Date:</label>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="bg-[#dde6e9] h-[2.1875rem] w-full rounded-[5px] px-2"
              />
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-[#08549c] text-white px-6 py-2 cursor-pointer rounded-md font-semibold hover:bg-blue-500 transition"
            >
              View
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MyForm;
