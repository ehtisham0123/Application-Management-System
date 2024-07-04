function Home() {
  return (
      <div className="container my-2"> 
	<br /><br />
        <div className="row align-items-center">
            <h2 className="text-center mb-5">Application Process System.</h2>
       <div className="row d-flex align-items-center">
        <div className="col-md-6">

      <h5 style={{lineHeight:"30px"}}>
	Faculty members and administrative staff are university personnel.
      </h5> 
      <br/>
      <h5 style={{lineHeight:"30px"}} className="mb-5 mb-md-2">
Faculty and staff may use the APS to review and process student applications. They can approve or reject applications and provide feedback. Administrative staff may also use the system for announcements.
      
</h5>  

        </div>
          <div className="col-md-6">
            <img
              src="1.png"
              height="100%"
              width="100%" 
            />
          </div>
        </div>
        </div>
      </div>
  );
}
export default Home;