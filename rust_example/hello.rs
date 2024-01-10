use chrono::offset::Local;

fn main() {
    let datetime = Local::now();
    let str = format!("{}", datetime.format("%Y/%m/%d"));
    println!("Hello ASL! {}", str);
}
