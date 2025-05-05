import React from "react";
import Landing from "../Components/Landing";

const Home = () => {
  return (
    <div className=" min-h-screen bg-gradient-to-b from-pink-300 via-white to-white">
      <Landing />
      {/* <section className="py-16  px-6 text-center bg-gradient-to-t from-white via-white to-pink-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-gray-500 font-semibold mb-4 "></h2>
        </div>
      </section> */}
      {/* <section className="py-16 px-6 bg-gradient-to-b from-white via-white to-pink-300">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Meet the Council Members
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {councilMembers.map((member, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition "
            >
              <img
                src={member.image}
                alt={member.name}
                className="rounded-full w-32 h-32 mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-blue-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section> */}
      {/* <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-4">Council Initiatives</h2>
        <p className="max-w-3xl mx-auto text-gray-600 mb-8">
          We host events, workshops, and campaigns for student welfare, social
          awareness, and campus engagement. Stay tuned for our upcoming drives,
          fests, and leadership forums!
        </p>
        <button className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition">
          View Events
        </button>
      </section> */}
    </div>
  );
};

export default Home;
