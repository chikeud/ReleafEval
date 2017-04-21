# ReleafEval
API that allows user to add company, update company info, delete company and request a user specified number of companies based on a user specified ranking criterion. No frontend implementation so API tester or request sending application such as Postman will be needed. Installation and setup information and specific requests to achieve each of the actions listed above will be explained in detail in ReadMe. Test Eval for releaf.ng

Please follow the guidelines exactly as described below.


First of all, please ensure that node and MongoDB is installed on system.
Download folder and cd into it. Type in "npm install"
Run MongoDB instance. (type "mongod" in terminal)
Type in "npm start"

After you confirm that the server is running, you can now proceed with Postman( or API tester/request sender of choice)
Find below the specific requests and format to accomplish described tasks;

Adding New Company: POST request: "localhost:8280/api/company/"
First Header | Second Header
------------ | -------------
Content from cell 1 | Content from cell 2
Content in the first column | Content in the second column
Request Body              |            Mandatory Value Types
--------------------------|---------------------------------
  name                    |                String
  rankings_financials     |                Number
  rankings_idea           |                Number
  num_employees           |                Number
  contact_email           |                String
  year_founded            |                Number
  rankings_team           |                Number
  contact_name            |                String

Please ensure that all the above body fields are input with corresponding values of the specified types.
Sending in that Post request will return a Company Object like:

{
  "success": true,
  "result": {
    "__v": 0,
    "contact_name": "Chike Udenze",
    "year_founded": 1100,
    "contact_email": "chikeudenze@gmail.com",
    "num_employees": 200,
    "query_name": "Eight_Corp",
    "name": "Eight Corp",
    "_id": "58f98452029b838460187962",
    "rankings": {
      "financials": 5,
      "team": 1,
      "idea": 10
    }
  }
}

Keep in mind that Companies with the same name cannot be added. If you try to you will receive a message asking that you try again with a different company name.

Deleting Company :  DELETE request: "localhost:8280/api/company/"
There's only one necessary body fields: the company name.
 Request Body                          Mandatory Value Types
  name                                    String
  
  
  
 Get Company Info:
 No field in the body. The request in this case is passed through the URL as a parameter. The queryname in the request below     represents whatever company name that was put when adding this company replacing all spaces with underscores. e.g if you're   trying to get the info for a company that had the name "Releaf Group", the queryname would be "Releaf_Group".
 
 GET request: "localhost:8280/api/company/queryname"
 The company object much like the one in the example given in the adding company section will be returned.
 
 
 
 Retrieve Collection of Companies based on n number of specified ranking statistic:
 GET request: "localhost:8280/api/company/ranking_name/noOfCompanies"
 No field in the body. The request in this case is passed through the URL as a parameter. The ranking_name in the request    above represents whatever ranking statistic the user is trying to find the highest n Companies.In this case, there are only three available ranking criteria ( "financials", "team", "idea"). So one of these will be in that 'ranking_name' position in the URL. noOfCompanies should simply be the maximum number of companies that the user will want to receive. It is of type Number. Please ensure no leading spaces are in URL before sending request. Example: If I'm trying to find out the highest 5 ranked companies based on 'financials' in my database. My URL will be "localhost:8280/api/company/financials/5". It would return an array of 5 (if there are up to 5 companies in database) Company Objects.
 

No Authentication was implemented for lack of time.

Thank You.
