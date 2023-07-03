using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Text.Json;
using System.Text.Json.Serialization;
using dotnetapp.Models;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class UserController:ControllerBase
    {
        private readonly MyProjectDbContext bc;

        public UserController(MyProjectDbContext bc)
        {
            this.bc = bc;
        }
         [HttpGet("user/viewAdmission")]
          public async Task<IActionResult> GetAllStudents()
        {
            

            var admissions = await bc.AdmissionModels.ToListAsync();

            return Ok( admissions);
        }
       
[HttpGet("user/viewAdmission/{userId}")]
public IActionResult ViewAdmission(int userId)
{
    var admissionCourse = (from c in bc.CourseModels
                           from a in bc.AdmissionModels
                           from s in bc.StudentModels
                           where a.UserId == userId && s.StudentId == a.StudentId && c.CourseId == a.CourseId
                           select new
                           {
                               AdmissionId=a.AdmissionId,
                               FirstName = s.FirstName,
                               LastName = s.LastName,
                               Mobile = s.Mobile,
                               Age = s.Age,
                               Gender = s.Gender,
                               HouseNo = s.HouseNo,
                               StreetName=s.StreetName,
                               AreaName=s.AreaName,
                               State=s.State,
                               Pincode=s.Pincode,
                               Nationality=s.Nationality,
                               CourseId = s.CourseId,
                               FatherName = s.FatherName,
                               MotherName = s.MotherName,
                               Email = s.Email,
                               AlternateMobile = s.AlternateMobile,
                               CourseName = c.CourseName,
                               CourseDescription = c.CourseDescription,
                               CourseDuration = c.CourseDuration,
                               CourseTiming = c.CourseTiming,
                               Instituteid = c.InstituteId,
                               DateOfJoining = a.DateOfJoining,
                               EndDate = a.EndDate
                           }).ToList();

    return Ok(admissionCourse);
}


        [HttpPost("user/addAdmission")]
       public async Task<IActionResult> AddAdmission([FromBody]StudentModel student ,int courseId,int instituteId,int userId)
        {    var course =  await bc.CourseModels.FindAsync(courseId);
         var admission=new AdmissionModel{
         CourseId=courseId,
        StudentId=student.StudentId,
        InstituteId=instituteId,
        UserId=userId,
        DateOfJoining=DateTime.Today,
        EndDate = bc.CalculateEndDate(course.CourseDuration, DateTime.Today)
   };
   await bc.AdmissionModels.AddAsync(admission);
  await  bc.SaveChangesAsync();
   var options = new JsonSerializerOptions
    {
        ReferenceHandler = ReferenceHandler.Preserve
    };

    // Serialize the updated admission model
    var serializedAdmission = JsonSerializer.Serialize(admission, options);

    return Ok(serializedAdmission);
    }
[HttpPut("user/editAdmission/{userid}")] 
        public async Task<IActionResult> UpdateAdmission(int userid,StudentModel s) 
        {
          
     var admission = bc.AdmissionModels.FirstOrDefault(a => a.UserId == userid);
     if(admission==null) {
                return BadRequest("Update Not Allowed");     
            }
     var st =bc.StudentModels.Find(admission.StudentId);
     if(st==null) {
                return BadRequest("Update Not Allowed");     
            }
                               st.FirstName = s.FirstName;
                               st.LastName = s.LastName;
                               st.Mobile = s.Mobile;
                               st.Age = s.Age;
                               st.Gender = s.Gender;
                               st.HouseNo = s.HouseNo;
                               st.StreetName=s.StreetName;
                               st.AreaName=s.AreaName;
                               st.State=s.State;
                               st.Pincode=s.Pincode;
                               st.Nationality=s.Nationality;
                               st.CourseId = s.CourseId;
                               st.FatherName = s.FatherName;
                               st.MotherName = s.MotherName;
                               st.Email = s.Email;
                               st.AlternateMobile = s.AlternateMobile;
                await bc.SaveChangesAsync();
                 var options = new JsonSerializerOptions
    {
        ReferenceHandler = ReferenceHandler.Preserve
    };

    // Serialize the updated admission model
    var serializedAdmission = JsonSerializer.Serialize(st, options);

    return Ok(serializedAdmission);
             
             
        }
        [HttpDelete("user/deleteAdmission/{admissionId}")] 
        public async Task<IActionResult> deleteAdmission(int admissionId)
        {
            
            var admission = bc.AdmissionModels.FirstOrDefault(a => a.AdmissionId == admissionId);

            bc.AdmissionModels.Remove(admission);
            await bc.SaveChangesAsync();
            return Ok(admissionId);
        }
        [HttpPost("AddStudent")]
        public async Task<IActionResult> AddStudent(StudentModel student)
        {
            await bc.StudentModels.AddAsync(student);
            await bc.SaveChangesAsync();
            return Ok(student);
        }
        [HttpGet("user/viewstatus")]
         public async Task<IActionResult>  ViewStatus(Decimal progresspercentage,int userid,int courseid)
        {
               var admission=bc.AdmissionModels.FirstOrDefault(a => a.UserId == userid && a.CourseId == courseid); 
            
              
 var progress=new ProgressModel{
    
    UserId=userid,
    CourseId=admission.CourseId,
    Progresspercentage=progresspercentage, 
    Status=bc.CalculateStatus(progresspercentage,admission.EndDate),
    Timetamp=DateTime.Now
 };
 bc.ProgressModels.Add(progress);
 bc.SaveChanges();
 return Ok(progress);
 
        }
         [HttpPost("user/viewstatus")]
         public async Task<IActionResult> ViewSatus(Decimal progresspercentage,int userid,int courseid)
        {
               var admission=bc.AdmissionModels.FirstOrDefault(a => a.UserId == userid && a.CourseId == courseid); 
            
              
 var progress=new ProgressModel{
    
    UserId=userid,
    CourseId=admission.CourseId,
    Progresspercentage=progresspercentage, 
    Status=bc.CalculateStatus(progresspercentage,admission.EndDate),
    Timetamp=DateTime.Now
 };
 bc.ProgressModels.Add(progress);
 bc.SaveChanges();
 return Ok(progress);
 
        }
       

        
    }
}