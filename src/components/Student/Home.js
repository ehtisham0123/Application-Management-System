function Home() {
  return (
      <div className="container my-2"> 
 <br /> <br />
        <div className="row align-items-center">

            <h2 className="text-center mb-5">Application Process System.</h2>
       <div className="row d-flex align-items-center">
        <div className="col-md-6">

      <h5 style={{lineHeight:"30px"}}>
Students are the primary users of the APS. They can be undergraduate or graduate students from various academic programs.
       
</h5> 
      <br/>
      <h5 style={{lineHeight:"30px"}} className="mb-5 mb-md-2">
Students use the APS to submit applications for various academic purposes, such as enrollment, course registration, or financial aid. They also monitor the status of their applications and receive notifications.
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