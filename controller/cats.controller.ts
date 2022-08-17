import {
 Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ForbiddenException
   } from 'https://deno.land/x/danet/mod.ts';
  import {Mydto} from './MyDto.dto.ts'
import {
  Bson,
  MongoClient,
} from "https://deno.land/x/mongo/mod.ts";

const client = new MongoClient();
await client.connect(
  "mongodb+srv://bobwatcherx:admin12345@cluster0.8fbdyy3.mongodb.net/dbcool?authMechanism=SCRAM-SHA-1",
);
const db = client.database("dbcool");
const users = db.collection("colname");


@Controller('cats')
export class CatsController {
  @Get()
 async	 findAll(): any {
  	const all_users = await users.find().toArray();
  	console.log(all_users)
    return all_users;
  }
  // ADD NEW DATA
  @Post("/add")
async  addnew(@Body() createdto:Mydto):any{

  	try{
  		const insertId = await users.insertOne({
  nama: createdto.nama,
  kelas: createdto.kelas,
});
  		console.log(insertId)
  	return JSON.stringify({message:"success",data:insertId})
  	}catch(err){
  		throw new ForbiddenException()
  	}
  }
// DELETE BY NAME
	@Delete("/delete/:delid")
	async deletedb(@Param("delid") delid:string):any{
const deleteCount = await users.deleteOne({ nama: delid });
	console.log(deleteCount)
	return deleteCount
	}
// UPDATE BY NAME 
@Put("/update/:upid")
	async updatedb(
		@Param("upid") upid:string,
		@Body() createdto:Mydto
		):any{
	const updateid = await users.updateOne(
  { nama: upid},
  { $set: {
   nama: createdto.nama,
   kelas:createdto.kelas 
} },
);
	console.log(updateid)
	return updateid
	}

}