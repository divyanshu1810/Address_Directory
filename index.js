const readline=require('readline');
const fs=require('fs');

const r= readline.createInterface({
    input: process.stdin,
    output: process.stdout,

});
console.log("*************************************************************");
console.log("Welcome to the address directory. ");
console.log("*************************************************************");
console.log("Please choose one of the following options : ");
console.log("*************************************************************");

// Function ask() to ask user to enter a choice
entry();
function entry(){
r.question("Press  (1) for adding a new address.  (2) for viewing the entries  (3) for going out of the directory :  ", (option)=>{ 
    choice(option);
});
}

function choice(op){
    switch (op)
        {
            case '1':add();
                    break;
            case '2':
                    show();
                    break;
            case '3':end();
                     break;
            default: console.log("Wrong option. Please Choose again."); 
            console.log("");  
            entry();
        }
       
};

//Function to add new entries to the directory

function add(){
    console.log("");
    r.question("Enter the name: ",(n)=>{
        r.question("Enter the address: ", (address)=>{
            let data={
                name:n,
                address:address,
            }
            let json=JSON.stringify(data);
            fs.appendFileSync("directory.json",json+",", function(err){
                if(err)throw err;
            });
            console.log("");
            console.log("Thank you for entering your name and Address! It has been successfully added to the directory");
            console.log("");
            entry();
        
        })
    })
} 

//function to display the whole directory
function show(){
    let data=fs.readFileSync('directory.json','utf-8');
    let l=data.length;
    // console.log(data);
    let data1;
    if(data.length<3)
    data1="[]";
    else if(data.charAt(l-1)==',')
    data1="["+data.substring(0,data.length-1)+" ]";
    else if(data.charAt(l-1)=='}')
    data1="["+data.substring(0,data.length)+" ]";
    else if(data.charAt(l-1)==' ')
    data1="["+data.substring(0,data.length-2)+" ]";
    let data3=JSON.parse(data1);
    console.log("");
    console.table(data3); 
    entry();
}

//function that closes the readline and takes the user out of the directory. 
function end(){
    console.log("***************************************");
    console.log("Hope You use our Address Book Again. :)");
    console.log("***************************************");
    r.close();
}