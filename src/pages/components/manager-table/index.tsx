import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline, MdEdit } from "react-icons/md";

const users = [
  {
    id: 1,
    name: "Brenoporfirio",
    email: "email@email.com",
    role: "Admin Geral",
    avatar: "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png",
  },
  {
    id: 2,
    name: "username11",
    email: "email@email.com",
    role: "Admin Geral",
    avatar: "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png",
  },
  {
    id: 3,
    name: "Ricardoalencar",
    email: "email@email.com",
    role: "Admin Geral",
    avatar: "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png",
  },
  {
    id: 4,
    name: "Leonardobezerrar",
    email: "email@emailasdasdasd.com",
    role: "Admin Geral",
    avatar: "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png",
  },
];

export default function TableUsers() {
  return (
    <div className="overflow-x-auto flex w-full" style={{ backgroundColor: '#1d232e', padding: '2rem', border: '1px solid #8888', borderRadius: '8px' }}>
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th className="text-center">Nome do usuário</th>
            <th className="text-center">E-mail</th>
            <th className="text-center">Função</th>
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="flex justify-center">
                <div className="flex text-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={user.avatar} alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="font-bold w-10">{user.name}</div>
                  </div>
                </div>
              </td>
              <td className="text-center">
                {user.email}
                <br />
              </td>
              <td className="text-center">
                {user.role}
                <br />
                <span className="badge badge-ghost badge-sm">Administrador</span>
              </td>
              <td className="text-center">
                <div className="flex justify-center space-x-2">
                  <button className="btn btn-ghost btn-xs">
                    <FaRegEye size={17} />
                  </button>
                  <button className="btn btn-ghost btn-xs">
                    <MdEdit size={17} />
                  </button>
                  <button className="btn btn-ghost btn-xs">
                    <MdDeleteOutline size={17} color="red" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
