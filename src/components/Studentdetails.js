/* eslint-disable react/prop-types */
function Studentdetails({ students }) {
  return (
    <div>
      {students.map((student) => (
        <div key={student.id} className="student-details">
          <h2>📝تفاصيل الطالب</h2>
          <div className="details">
            <table>
              <tr>
                <td className="bold">تاريخ التخرج</td>
                <td>{student.dateOfGraduation}</td>
              </tr>
              <tr dir="rtl">
                <td className="bold">درجة</td>
                <td>{student.grade}</td>
              </tr>
              <tr>
                <td className="bold">نسبة مئوية</td>
                <td>{student.percentage}%</td>
              </tr>
              <tr>
                <td className="bold"> المرحلة</td>
                <td>{student.level}</td>
              </tr>
              <tr>
                <td className="bold"> تم التحقق</td>
                <td>{student.checked}</td>
              </tr>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Studentdetails;
