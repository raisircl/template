const { render } = require("ejs");
const { response } = require("express");
const { MongoClient ,ObjectId , ServerApiVersion } = require('mongodb');

const dotenv = require('dotenv');
dotenv.config();

const uri = `mongodb+srv://codetestst:${process.env.PWD}@cluster-st-codetest.u9esacd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-ST-CodeTest`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
// pages folder files
async function renderFile(req,res,pageName,title){
    
    if(pageName=='leads')
    {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("portfolioDB").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        const myDB = client.db("portfolioDB");
            const myColl = myDB.collection("contactUsData");
            const result = await myColl.find().toArray();
            
            //console.log(result);
       return res.render(`pages/${pageName}`,{data:result,title:title})    
    }
    else if(pageName=='lead-details')
    {
        const objectId = ObjectId.createFromHexString(req.query.id);

        console.log(`Your reqested id is ${objectId}`);
       

        const query={_id:objectId};
        
        console.log(`Your query is ${query}`);
        
         // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("portfolioDB").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        const myDB = client.db("portfolioDB");
            const myColl = myDB.collection("contactUsData");
            const result = await myColl.findOne(query);
            
            console.log(result);
       return res.render(`pages/${pageName}`,{data:result,title:title})  
    }
    return res.render(`pages/${pageName}`,{title:title})
}

// pages folder files
exports.home=(req,res)=>renderFile(req,res,'index','Bracket Responsive Bootstrap3 Admin');
exports.alerts=(req,res)=>renderFile(req,res,'alerts','alerts');
exports.blank=(req,res)=>renderFile(req,res,'blank','blank');
exports.leads=(req,res)=>renderFile(req,res,'leads','leads');
exports.lead_details=(req,res)=>renderFile(req,res,'lead-details','lead-details');

exports.blog_list=(req,res)=>renderFile(req,res,'blog-list','blog-list');
exports.blog_single=(req,res)=>renderFile(req,res,'blog-single','blog-single');
exports.bug_issues=(req,res)=>renderFile(req,res,'bug-issues','bug-issues');
exports.bug_tracker=(req,res)=>renderFile(req,res,'bug-tracker','bug-tracker');
exports.buttons=(req,res)=>renderFile(req,res,'buttons','buttons');
exports.calendar=(req,res)=>renderFile(req,res,'calendar','calendar');
exports.code_editor=(req,res)=>renderFile(req,res,'code-editor','code-editor');
exports.compose=(req,res)=>renderFile(req,res,'compose','compose');
exports.email=(req,res)=>renderFile(req,res,'email','email');
exports.extras=(req,res)=>renderFile(req,res,'extras','extras');
exports.fixed_width_noleft=(req,res)=>renderFile(req,res,'fixed-width-noleft','fixed-width-noleft');
exports.fixed_width=(req,res)=>renderFile(req,res,'fixed-width','fixed-width');
exports.fixed_width2=(req,res)=>renderFile(req,res,'fixed-width2','fixed-width2');
exports.form_layouts=(req,res)=>renderFile(req,res,'form-layouts','form-layouts');
exports.form_validation=(req,res)=>renderFile(req,res,'form-validation','form-validation');
exports.form_wizards=(req,res)=>renderFile(req,res,'form-wizards','form-wizards');
exports.general_forms=(req,res)=>renderFile(req,res,'general-forms','general-forms');
exports.graphs=(req,res)=>renderFile(req,res,'graphs','graphs');
exports.horizontal_menu=(req,res)=>renderFile(req,res,'horizontal-menu','horizontal-menu');
exports.horizontal_menu2=(req,res)=>renderFile(req,res,'horizontal-menu2','horizontal-menu2');
exports.icons=(req,res)=>renderFile(req,res,'icons','icons');
exports.invoice=(req,res)=>renderFile(req,res,'invoice','invoice');
exports.layouts=(req,res)=>renderFile(req,res,'layouts','layouts');
exports.locked=(req,res)=>renderFile(req,res,'locked','locked');
exports.maps=(req,res)=>renderFile(req,res,'maps','maps');
exports.media_manager=(req,res)=>renderFile(req,res,'media-manager','media-manager');
exports.modals=(req,res)=>renderFile(req,res,'modals','modals');
exports.notfound=(req,res)=>renderFile(req,res,'notfound','Notfound');
exports.people_directory=(req,res)=>renderFile(req,res,'people-directory','people-directory');
exports.profile=(req,res)=>renderFile(req,res,'profile','profile');
exports.read=(req,res)=>renderFile(req,res,'read','read');
exports.search_results=(req,res)=>renderFile(req,res,'search-results','search-results');
exports.singin=(req,res)=>renderFile(req,res,'signin','signin');
exports.signup=(req,res)=>renderFile(req,res,'signup','signup');
exports.sliders=(req,res)=>renderFile(req,res,'sliders','sliders');
exports.tables=(req,res)=>renderFile(req,res,'tables','tables');
exports.tabs_accordions=(req,res)=>renderFile(req,res,'tabs-accordions','tabs-accordions');
exports.timeline=(req,res)=>renderFile(req,res,'timeline','timeline');
exports.typography=(req,res)=>renderFile(req,res,'typography','typography');
exports.view_issue=(req,res)=>renderFile(req,res,'view-issue','view-issue');
exports.widgets=(req,res)=>renderFile(req,res,'widgets','widgets');
exports.wysiwyg=(req,res)=>renderFile(req,res,'wysiwyg','wysiwyg');
exports.x_editable=(req,res)=>renderFile(req,res,'x-editable','x-editable');
exports.signup_from= async(req,res,next)=>{
try{
    const {Firstname,Lastname,Username,Password,retypepassword,Day,Yea,Email}= req.body;
    console.log(Firstname,Username);
   await res.render('pages/index',{title:'Home'});
}catch(error){
 next(error)
}
};

exports.login=async(req,res,next)=>{
    try{
        const{Username,Password}=req.body;
        await res.render('pages/index',{title:'Home'});

    }
    catch(error){
        next(error)
    }
}
//ajax folder file

function ajaxFolder(res,fileName){
    return res.render(`ajax/${fileName}`)
};

exports.accordion=(req,res)=>ajaxFolder(res,'accordion')
exports.panel=(req,res)=>ajaxFolder(res,'panel')
exports.photo_viewer_rtl=(req,res)=>ajaxFolder(res,'photo-viewer-rtl')
exports.photo_viewer=(req,res)=>ajaxFolder(res,'photo-viewer')
exports.remote=(req,res)=>ajaxFolder(res,'remote')
exports.tabs=(req,res)=>ajaxFolder(res,'tabs')


