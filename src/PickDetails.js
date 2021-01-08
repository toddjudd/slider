const PickDetails = (props) => {
  const { pick } = props;
  return (
    <div className='PickDetails'>
      <div className='project'>
        <span className='title'>Project:</span> {pick.project}
      </div>
      <div className='created'>
        <span className='title'>Created:</span> {pick.created}
      </div>
      <div className='waveId'>
        <span className='title'>Wave #:</span> {pick.waveId}
      </div>
      <div className='shipmentId'>
        <span className='title'>Shipment #:</span> {pick.shipmentId}
      </div>
      <div className='horizontal-offset'></div>
      <div className='expectedSourceLocation'>
        <span className='title'>Location:</span> {pick.expectedSourceLocation}
      </div>
      <div className='horizontal-offset'></div>
      <div className='pickslipId'>
        <span className='title'>Pickslip #:</span> {pick.pickslipId}
      </div>
      <div className='orderId'>
        <span className='title'>Order #:</span> {pick.orderId}
      </div>
    </div>
  );
};

export default PickDetails;
