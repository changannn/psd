data "aws_vpc" "management_vpc" {
    id = "vpc-09c4c6ec85a775835" 
}

data "aws_subnet" "management_subnets_a" {
    id = "subnet-049a1056994b45f53"
}

data "aws_subnet" "management_subnets_b" {
    id = "subnet-0e90d3f88c7ba8edc"
}

data "aws_security_group" "management_sg" {
    id = "sg-03d9ad3cbbd2b51ca"
}

resource "aws_vpc_endpoint" "to_ssm" {
    service_name      = "com.amazonaws.ap-southeast-1.ssm"
    vpc_id            = "${data.aws_vpc.management_vpc.id}"
    vpc_endpoint_type = "Interface"

    security_group_ids = [
        "${data.aws_security_group.management_sg.id}"
    ]

    subnet_ids = [
        "${data.aws_subnet.management_subnets_a.id}",
        "${data.aws_subnet.management_subnets_b.id}"
    ]

  private_dns_enabled = true
}

resource "aws_vpc_endpoint" "to_ssmmessages" {
    service_name      = "com.amazonaws.ap-southeast-1.ssmmessages"
    vpc_id            = "${data.aws_vpc.management_vpc.id}"
    vpc_endpoint_type = "Interface"

    security_group_ids = [
        "${data.aws_security_group.management_sg.id}"
    ]

    subnet_ids = [
        "${data.aws_subnet.management_subnets_a.id}",
        "${data.aws_subnet.management_subnets_b.id}"
    ]

  private_dns_enabled = true
}

resource "aws_vpc_endpoint" "to_ec2messages" {
    service_name      = "com.amazonaws.ap-southeast-1.ec2messages"
    vpc_id            = "${data.aws_vpc.management_vpc.id}"
    vpc_endpoint_type = "Interface"

    security_group_ids = [
        "${data.aws_security_group.management_sg.id}"
    ]

    subnet_ids = [
        "${data.aws_subnet.management_subnets_a.id}",
        "${data.aws_subnet.management_subnets_b.id}"
    ]

  private_dns_enabled = true
}



resource "aws_vpc_endpoint" "to_ec2" {
    service_name      = "com.amazonaws.ap-southeast-1.ec2"
    vpc_id            = "${data.aws_vpc.management_vpc.id}"
    vpc_endpoint_type = "Interface"

    security_group_ids = [
        "${data.aws_security_group.management_sg.id}"
    ]

    subnet_ids = [
        "${data.aws_subnet.management_subnets_a.id}",
        "${data.aws_subnet.management_subnets_b.id}"
    ]

  private_dns_enabled = true
}