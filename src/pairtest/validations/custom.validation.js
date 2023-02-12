

const childCheck = (value, helpers) => {
  const { adult = 0, child = 0, infant = 0  } = value;
  const totalNoOfTickets = adult + child + infant;
  if(totalNoOfTickets > 20){
    return helpers.message('Only a maximum of 20 tickets that can be purchased at a time');
  }
  if(totalNoOfTickets < 1){
    return helpers.message('Minimum of 1 ticket has to be purchased');
  }

  if( adult === 0 && (child > 0 || infant > 0)){
    return helpers.message('Purchase of infant and child tickets are not allowed without an adult');
  }

  if(infant > adult){
    return helpers.message('Purchase of infant tickets greater than adult is not allowed');
  }
  return value;
};

module.exports = {
  childCheck,
};
