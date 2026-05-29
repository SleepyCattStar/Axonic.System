def check_cpu(cpu, limit):

    return cpu >= limit


def check_ram(ram, limit):

    return ram >= limit


def check_temperature(temp, limit):

    if temp is None:
        return False

    return temp >= limit