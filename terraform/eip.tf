data "aws_instance" "foo" {
  instance_id = "i-009d661265b491671"
}


resource "aws_eip" "lb" {
  instance = data.aws_instance.foo.instance_id
  associate_with_private_ip = "10.0.1.24"
}