import React from "react";

const Guideline = () => {
  return (
    <section className="py-10 px-4 lg:px-16 mb-8">
  <h2 className="text-2xl font-semibold mb-3">How to Use the Website</h2>
  <ol className="list-decimal list-inside space-y-3 text-base-content">
    <li>
      <strong>Register an Account:</strong> Click on <code>Register</code> in the top navigation or on the login page to create a new user account using your email or Google login.
    </li>
    <li>
      <strong>Login:</strong> Use your registered email and password, or sign in with Google, to access private features.
    </li>
    <li>
      <strong>Explore Events:</strong> Visit <code>/upcoming-events</code> to browse all upcoming social development events.
    </li>
    <li>
      <strong>Join Events:</strong> Click on an event to see details and click <em>Join</em> to participate.
    </li>
    <li>
      <strong>Create Events:</strong> After login, navigate to <code>/create-event</code> to create and publish new social development events.
    </li>
    <li>
      <strong>Manage Your Events:</strong> Access <code>/manage-events</code> to update or delete events you've created.
    </li>
    <li>
      <strong>View Joined Events:</strong> Go to <code>/joined-events</code> to see the list of events you have joined.
    </li>
    <li>
      <strong>Search & Filter:</strong> Use the search bar and filters on events pages to find events by date, type, or location.
    </li>
  </ol>
</section>
  );
};

export default Guideline;
